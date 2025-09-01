import * as React from 'react';
import { NavigationContainerRef, DrawerActions, StackActions, CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

export function reset(name: string) {
  navigationRef.current?.dispatch(
    CommonActions.reset({ index: 0, routes: [{ name }] })
  );
}

export function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
}

export function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}