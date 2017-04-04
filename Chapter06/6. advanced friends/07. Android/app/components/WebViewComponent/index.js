import React, { Component } from 'react';

import {
  WebView
} from 'react-native';

export default (props) => {
  return (
    <WebView
      source={{ uri: props.url }}
    />
  )
}
