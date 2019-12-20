/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ErrorInfo } from 'react';
import { Alert } from 'react-bootstrap';

// tslint:disable-next-line
interface IProps {
	title?: string;
	message?: string;
	children: React.ReactNode;
}

interface IState {
	hasError: boolean;
	errorMessage?: string;
}

const textHyphens = css`
	overflow: hidden;
	word-break: break-word;
	hyphens: auto;
`;

export class ErrorBoundary extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = { hasError: false };
	}

	public componentDidCatch(error: Error, info: ErrorInfo) {
		// You can also log the error to an error reporting service
		// tslint:disable-next-line
		console.error(error, info);
		this.setState({
			hasError: true,
			errorMessage: error.stack,
		});
	}

	public render() {
		const { title = 'Something went wrong.', message = this.state.errorMessage } = this.props;

		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<Alert variant="danger">
					<Alert.Heading css={textHyphens}>{title}</Alert.Heading>
					<p css={textHyphens}>{message}</p>
				</Alert>
			);
		}

		return this.props.children;
	}
}
