/** @jsx jsx */
import { jsx } from '@emotion/core';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import RawMarkdown from 'markdown-to-jsx';
import { useEffect, useRef } from 'react';
import { styles } from './styles';

interface IMarkdownProps {
	children: string;
}

export function Markdown({ children }: IMarkdownProps) {
	const rootRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!rootRef || !rootRef.current) {
			return;
		}
		rootRef.current.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block as HTMLElement);
		});
	}, [children]);

	return (
		<div ref={rootRef} css={styles}>
			<RawMarkdown>{children}</RawMarkdown>
		</div>
	);
}
