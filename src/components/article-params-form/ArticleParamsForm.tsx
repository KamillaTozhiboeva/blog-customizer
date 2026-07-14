import { useState, useRef, useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import clsx from 'clsx';

// Импорт UI-компонентов из стартер-кита (относительные пути гарантируют сборку в любой среде)
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';

// Импорт типов и дефолтных значений из констант проекта
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,  
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Описание типов для входящих пропсов компонента
interface ArticleParamsFormProps {
	currentSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	currentSettings,
	onApply,
}: ArticleParamsFormProps) => {
	// Состояние открытия/закрытия сайдбара
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	// Локальное состояние формы ("черновик" настроек)
	const [formState, setFormState] = useState<ArticleStateType>(currentSettings);

	// Реф для отслеживания кликов вне формы
	const formRef = useRef<HTMLDivElement>(null);

	// Управление слушателями событий (клик вне формы и Escape)
	useEffect(() => {
		if (!isFormOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsFormOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsFormOpen(false);
			}
		};

		// Навешиваем слушатели только когда сайдбар открыт
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		// Функция очистки (убираем слушатели при закрытии формы или размонтировании)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isFormOpen]);

	// Переключение состояния открытия сайдбара
	const handleToggleForm = () => {
		setIsFormOpen((prev: boolean) => !prev);
	};

	// Обработка отправки формы (Применить)
	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		onApply(formState); // Передаем локальный черновик в глобальный стейт App
		setIsFormOpen(false); // Закрываем сайдбар
	};

	// Обработка сброса формы (Сбросить)
	const handleReset = (event: SyntheticEvent) => {
		event.preventDefault();
		onApply(defaultArticleState); // Сбрасываем глобальный стейт App к дефолтному
		setIsFormOpen(false); // Закрываем сайдбар
	};

	return (
		<div ref={formRef}>
			{/* Кнопка-стрелка позиционируется независимо и всегда видна на экране */}
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />

			{/* Сайдбар, который плавно выезжает благодаря классам .container и .container_open */}
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>

					{/* 1. Селект для выбора шрифта */}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setFormState({ ...formState, fontFamilyOption: selected })
						}
						title='Шрифт'
					/>

					{/* 2. Радиокнопки для выбора размера шрифта */}
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected) =>
							setFormState({ ...formState, fontSizeOption: selected })
						}
						title='Размер шрифта'
					/>

					{/* 3. Селект для выбора цвета шрифта */}
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setFormState({ ...formState, fontColor: selected })
						}
						title='Цвет шрифта'
					/>

					{/* Разделительная линия */}
					<Separator />

					{/* 4. Селект для выбора цвета фона */}
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setFormState({ ...formState, backgroundColor: selected })
						}
						title='Цвет фона'
					/>

					{/* 5. Селект для выбора ширины контента */}
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected) =>
							setFormState({ ...formState, contentWidth: selected })
						}
						title='Ширина контента'
					/>

					{/* Контейнер для кнопок управления */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
