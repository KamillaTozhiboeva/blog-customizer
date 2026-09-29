import { useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';

import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [currentSettings, setCurrentSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const appStyles = {
		'--font-family': currentSettings.fontFamilyOption.value,
		'--font-size': currentSettings.fontSizeOption.value,
		'--font-color': currentSettings.fontColor.value,
		'--bg-color': currentSettings.backgroundColor.value,
		'--container-width': currentSettings.contentWidth.value,
	} as React.CSSProperties;

	return (
		<main className={styles.main} style={appStyles}>
			<ArticleParamsForm
				currentSettings={currentSettings}
				onApply={setCurrentSettings}
			/>

			<Article />
		</main>
	);
};
