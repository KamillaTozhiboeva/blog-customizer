import { useState } from 'react';

// Импорт компонентов
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';

// Импорт типов и дефолтного состояния
import { ArticleStateType, defaultArticleState } from 'src/constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	// Глобальное состояние примененных настроек статьи
	const [currentSettings, setCurrentSettings] = useState<ArticleStateType>(defaultArticleState);

	// Переводим объект настроек в CSS-переменные
	const appStyles = {
		'--font-family': currentSettings.fontFamilyOption.value,
		'--font-size': currentSettings.fontSizeOption.value,
		'--font-color': currentSettings.fontColor.value,
		'--bg-color': currentSettings.backgroundColor.value,
		'--container-width': currentSettings.contentWidth.value,
	} as React.CSSProperties;

	return (
		<main className={styles.main} style={appStyles}>
			{/* Передаем обязательные пропсы в форму настроек */}
			<ArticleParamsForm
				currentSettings={currentSettings}
				onApply={setCurrentSettings}
			/>
			{/* Сама статья */}
			<Article />
		</main>
	);
};