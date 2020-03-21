import React, { Component } from "react";

class Modal extends Component {
  state = {};
  render() {
    return (
      <div
        id="popup1"
        className="overlay"
        className={this.props.show ? "overlay visibleOverlay" : "overlay"}
      >
        <div className="popup">
          <h2>{this.props.title}</h2>
          <a className="close" onClick={this.onPopupClose.bind(this)}>
            &times;
          </a>
          <div className="content">{this.props.children}</div>
          <div className="footer">
            <button
              type="button"
              className="btn btn-primary footerButton"
              onClick={this.props.onSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-primary footerButton"
              onClick={this.props.close}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  onPopupClose() {
    this.props.close();
  }
}

export default Modal;
