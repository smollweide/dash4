// tslint:disable-next-line
import { registerPlugin } from '@dash4/client/build/register-plugin';
import { Readme } from './components/Readme';
import { ReadmeList } from './components/ReadmeList';

registerPlugin('PluginReadme', Readme);
registerPlugin('PluginReadmeList', ReadmeList);
