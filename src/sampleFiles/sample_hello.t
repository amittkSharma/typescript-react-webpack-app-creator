import * as React from 'react';

export interface IHelloProps { compiler: string; framework: string; author: string; }

const appStyle = {
  h1: {
    color: '#4ABDAC'
  },

  h3: {
    color: '#FC4A1A'
  }
};



export class Hello extends React.Component<IHelloProps, {}> {

    render() {
        return (
          <div style={appStyle}>
          <h1 style={appStyle.h1}>Hello from {this.props.compiler} and {this.props.framework}! </h1>
          <h3 style={appStyle.h3}>Author: {this.props.author}</h3>
        </div>
      );
    }
}
