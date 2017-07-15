import * as React from 'react';

export interface IHelloProps { compiler: string; framework: string; author: string; }

export class Hello extends React.Component<IHelloProps, {}> {

    render() {
        return (
          <div>
          <h1>Hello from {this.props.compiler} and {this.props.framework}! </h1>
          <h3>Author: {this.props.author}</h3>
        </div>
      );
    }
}
