import { CreateNavigatorConfig, NavigationStackRouterConfig, NavigationRouteConfigMap } from 'react-navigation';
import { NavigationStackConfig, NavigationStackOptions, NavigationStackProp } from '../types';
declare function createStackNavigator(routeConfigMap: NavigationRouteConfigMap<NavigationStackOptions, NavigationStackProp>, stackConfig?: CreateNavigatorConfig<NavigationStackConfig, NavigationStackRouterConfig, NavigationStackOptions>): any;
export default createStackNavigator;
