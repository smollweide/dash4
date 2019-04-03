import React, { ErrorInfo } from 'react';
import { Alert } from 'react-bootstrap';
import withStyles, { WithStyles } from 'react-jss';
import { styles } from './styles';

// tslint:disable-next-line
interface IProps extends WithStyles<typeof styles> {
	title?: string;
	message?: string;
	children: React.ReactNode;
}

interface IState {
	hasError: boolean;
	errorMessage?: string;
}

export class ErrorBoundaryUnstyled extends React.Component<IProps, IState> {
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
		const { classes, title = 'Something went wrong.', message = this.state.errorMessage } = this.props;

		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<Alert variant="danger">
					<Alert.Heading className={classes.text}>{title}</Alert.Heading>
					<p className={classes.text}>{message}</p>
				</Alert>
			);
		}

		return this.props.children;
	}
}

export const ErrorBoundary = withStyles(styles)(ErrorBoundaryUnstyled);
