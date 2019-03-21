// tslint:disable-next-line
// /* global fetch, WebSocket, location */
import { registerPlugin } from '@dash4/client/build/register-plugin';
import withStyles from 'react-jss';
import { Readme } from './readme';
import { ReadmeList } from './readme-list';
import { styles as readmeListStyles } from './readme-list-styles';
import { styles as readmeStyles } from './readme-styles';

registerPlugin('PluginReadme', withStyles(readmeStyles)(Readme));
registerPlugin('PluginReadmeList', withStyles(readmeListStyles)(ReadmeList));
