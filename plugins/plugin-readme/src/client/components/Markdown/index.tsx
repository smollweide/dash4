import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import RawMarkdown from 'markdown-to-jsx';
import React, { useEffect, useRef } from 'react';
import './github-styles.css';

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
			hljs.highlightBlock(block);
		});
	}, [children]);

	return (
		<div className={`markdown-body`} ref={rootRef}>
			<RawMarkdown>{children}</RawMarkdown>
		</div>
	);
}
