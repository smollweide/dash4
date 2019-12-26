import { css } from '@emotion/core';

export const styles = css`
	& {
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
			Segoe UI Emoji;
		font-size: 16px;
		line-height: 1.5;
		word-wrap: break-word;
		max-width: 880px;
		margin: 0 auto;
	}
	& kbd {
		display: inline-block;
		padding: 3px 5px;
		font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
		line-height: 10px;
		color: #444d56;
		vertical-align: middle;
		background-color: #fafbfc;
		border: 1px solid #d1d5da;
		border-radius: 3px;
		box-shadow: inset 0 -1px 0 #d1d5da;
	}
	&:after,
	&:before {
		display: table;
		content: '';
	}
	&:after {
		clear: both;
	}
	& > :first-of-type {
		margin-top: 0 !important;
	}
	& > :last-child {
		margin-bottom: 0 !important;
	}
	& a:not([href]) {
		color: inherit;
		text-decoration: none;
	}
	& .absent {
		color: #cb2431;
	}
	& .anchor {
		float: left;
		padding-right: 4px;
		margin-left: -20px;
		line-height: 1;
	}
	& .anchor:focus {
		outline: none;
	}
	& blockquote,
	& details,
	& dl,
	& ol,
	& p,
	& pre,
	& table,
	& ul {
		margin-top: 0;
		margin-bottom: 16px;
	}
	& hr {
		height: 0.25em;
		padding: 0;
		margin: 24px 0;
		background-color: #e1e4e8;
		border: 0;
	}
	& blockquote {
		padding: 0 1em;
		color: #6a737d;
		border-left: 0.25em solid #dfe2e5;
	}
	& blockquote > :first-of-type {
		margin-top: 0;
	}
	& blockquote > :last-child {
		margin-bottom: 0;
	}
	& h1,
	& h2,
	& h3,
	& h4,
	& h5,
	& h6 {
		margin-top: 24px;
		margin-bottom: 16px;
		font-weight: 600;
		line-height: 1.25;
	}
	& h1 .octicon-link,
	& h2 .octicon-link,
	& h3 .octicon-link,
	& h4 .octicon-link,
	& h5 .octicon-link,
	& h6 .octicon-link {
		color: #1b1f23;
		vertical-align: middle;
		visibility: hidden;
	}
	& h1:hover .anchor,
	& h2:hover .anchor,
	& h3:hover .anchor,
	& h4:hover .anchor,
	& h5:hover .anchor,
	& h6:hover .anchor {
		text-decoration: none;
	}
	& h1:hover .anchor .octicon-link,
	& h2:hover .anchor .octicon-link,
	& h3:hover .anchor .octicon-link,
	& h4:hover .anchor .octicon-link,
	& h5:hover .anchor .octicon-link,
	& h6:hover .anchor .octicon-link {
		visibility: visible;
	}
	& h1 code,
	& h1 tt,
	& h2 code,
	& h2 tt,
	& h3 code,
	& h3 tt,
	& h4 code,
	& h4 tt,
	& h5 code,
	& h5 tt,
	& h6 code,
	& h6 tt {
		font-size: inherit;
	}
	& h1 {
		font-size: 2em;
	}
	& h1,
	& h2 {
		padding-bottom: 0.3em;
		border-bottom: 1px solid #eaecef;
	}
	& h2 {
		font-size: 1.5em;
	}
	& h3 {
		font-size: 1.25em;
	}
	& h4 {
		font-size: 1em;
	}
	& h5 {
		font-size: 0.875em;
	}
	& h6 {
		font-size: 0.85em;
		color: #6a737d;
	}
	& ol,
	& ul {
		padding-left: 2em;
	}
	& ol.no-list,
	& ul.no-list {
		padding: 0;
		list-style-type: none;
	}
	& ol ol,
	& ol ul,
	& ul ol,
	& ul ul {
		margin-top: 0;
		margin-bottom: 0;
	}
	& li {
		word-wrap: break-all;
	}
	& li > p {
		margin-top: 16px;
	}
	& li + li {
		margin-top: 0.25em;
	}
	& dl {
		padding: 0;
	}
	& dl dt {
		padding: 0;
		margin-top: 16px;
		font-size: 1em;
		font-style: italic;
		font-weight: 600;
	}
	& dl dd {
		padding: 0 16px;
		margin-bottom: 16px;
	}
	& table {
		display: block;
		width: 100%;
		overflow: auto;
	}
	& table th {
		font-weight: 600;
	}
	& table td,
	& table th {
		padding: 6px 13px;
		border: 1px solid #dfe2e5;
	}
	& table tr {
		background-color: #fff;
		border-top: 1px solid #c6cbd1;
	}
	& table tr:nth-of-type(2n) {
		background-color: #f6f8fa;
	}
	& table img {
		background-color: initial;
	}
	& img {
		max-width: 100%;
		box-sizing: initial;
		background-color: #fff;
	}
	& img[align='right'] {
		padding-left: 20px;
	}
	& img[align='left'] {
		padding-right: 20px;
	}
	& .emoji {
		max-width: none;
		vertical-align: text-top;
		background-color: initial;
	}
	& span.frame {
		display: block;
		overflow: hidden;
	}
	& span.frame > span {
		display: block;
		float: left;
		width: auto;
		padding: 7px;
		margin: 13px 0 0;
		overflow: hidden;
		border: 1px solid #dfe2e5;
	}
	& span.frame span img {
		display: block;
		float: left;
	}
	& span.frame span span {
		display: block;
		padding: 5px 0 0;
		clear: both;
		color: #24292e;
	}
	& span.align-center {
		display: block;
		overflow: hidden;
		clear: both;
	}
	& span.align-center > span {
		display: block;
		margin: 13px auto 0;
		overflow: hidden;
		text-align: center;
	}
	& span.align-center span img {
		margin: 0 auto;
		text-align: center;
	}
	& span.align-right {
		display: block;
		overflow: hidden;
		clear: both;
	}
	& span.align-right > span {
		display: block;
		margin: 13px 0 0;
		overflow: hidden;
		text-align: right;
	}
	& span.align-right span img {
		margin: 0;
		text-align: right;
	}
	& span.float-left {
		display: block;
		float: left;
		margin-right: 13px;
		overflow: hidden;
	}
	& span.float-left span {
		margin: 13px 0 0;
	}
	& span.float-right {
		display: block;
		float: right;
		margin-left: 13px;
		overflow: hidden;
	}
	& span.float-right > span {
		display: block;
		margin: 13px auto 0;
		overflow: hidden;
		text-align: right;
	}
	& code,
	& tt {
		padding: 0.2em 0.4em;
		margin: 0;
		font-size: 85%;
		background-color: rgba(27, 31, 35, 0.05);
		border-radius: 3px;
	}
	& code br,
	& tt br {
		display: none;
	}
	& del code {
		text-decoration: inherit;
	}
	& pre {
		word-wrap: normal;
	}
	& pre > code {
		padding: 0;
		margin: 0;
		font-size: 100%;
		word-break: normal;
		white-space: pre;
		background: transparent;
		border: 0;
	}
	& .highlight {
		margin-bottom: 16px;
	}
	& .highlight pre {
		margin-bottom: 0;
		word-break: normal;
	}
	& .highlight pre,
	& pre {
		padding: 16px;
		overflow: auto;
		font-size: 85%;
		line-height: 1.45;
		background-color: #f6f8fa;
		border-radius: 3px;
	}
	& pre code,
	& pre tt {
		display: inline;
		max-width: auto;
		padding: 0;
		margin: 0;
		overflow: visible;
		line-height: inherit;
		word-wrap: normal;
		background-color: initial;
		border: 0;
	}
	& .csv-data td,
	& .csv-data th {
		padding: 5px;
		overflow: hidden;
		font-size: 12px;
		line-height: 1;
		text-align: left;
		white-space: nowrap;
	}
	& .csv-data .blob-num {
		padding: 10px 8px 9px;
		text-align: right;
		background: #fff;
		border: 0;
	}
	& .csv-data tr {
		border-top: 0;
	}
	& .csv-data th {
		font-weight: 600;
		background: #f6f8fa;
		border-top: 0;
	}
`;
