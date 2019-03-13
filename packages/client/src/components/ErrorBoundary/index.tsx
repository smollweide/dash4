import React, { ErrorInfo } from 'react';

// tslint:disable-next-line
interface IProps {
	// tslint:disable-next-line
}

interface IState {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
	public static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	constructor(props: IProps) {
		super(props);
		this.state = { hasError: false };
	}

	public componentDidCatch(error: Error, info: ErrorInfo) {
		// You can also log the error to an error reporting service
		// tslint:disable-next-line
		console.error(error, info);
	}

	public render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}
