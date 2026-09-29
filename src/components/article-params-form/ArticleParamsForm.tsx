import { useState, useRef, useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';

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

interface ArticleParamsFormProps {
	currentSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	currentSettings,
	onApply,
}: ArticleParamsFormProps) => {

	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	const [formState, setFormState] = useState<ArticleStateType>(currentSettings);

	const formRef = useRef<HTMLDivElement>(null);

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

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isFormOpen]);

	const handleToggleForm = () => {
		setIsFormOpen((prev: boolean) => !prev);
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		onApply(formState); 
		setIsFormOpen(false);
	};

	const handleReset = (event: SyntheticEvent) => {
		event.preventDefault();
		onApply(defaultArticleState);
		setIsFormOpen(false);
	};
	return (
		<div ref={formRef}>

			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />

			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>


					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setFormState({ ...formState, fontFamilyOption: selected })
						}
						title='Шрифт'
					/>


					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected) =>
							setFormState({ ...formState, fontSizeOption: selected })
						}
						title='Размер шрифта'
					/>


					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setFormState({ ...formState, fontColor: selected })
						}
						title='Цвет шрифта'
					/>


					<Separator />


					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setFormState({ ...formState, backgroundColor: selected })
						}
						title='Цвет фона'
					/>


					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected) =>
							setFormState({ ...formState, contentWidth: selected })
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
