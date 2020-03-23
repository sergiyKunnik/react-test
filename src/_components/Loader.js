import React from 'react';
import Loader from 'react-loader-spinner'
export class LoaderComponent extends React.Component {
  render() {
    return (
      <div className="text-center justify-content-center" style={{height: '100%'}}>
        <Loader
          type="ThreeDots"
          // color="#00BFFF"
          height={100}
          width={100}

        />
      </div>
    );
  }
}

