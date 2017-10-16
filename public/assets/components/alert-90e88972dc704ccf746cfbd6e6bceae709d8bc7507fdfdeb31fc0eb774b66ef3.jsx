class Alert extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(
      this.props.onClose,
      this.props.timeout
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  alertClass (type) {
    let classes = {
      error: 'status-message--error',
      alert: 'status-message--alert',
      notice: 'status-message--notice',
      success: 'status-message--success'
    };
    return classes[type] || classes.success;
  }

  render() {
    const message = this.props.message;
    const alertClassName = `alert ${ this.alertClass(message.type) } fade in`;

    return(
      <div className={`status-message ${ alertClassName }`}>
        { message.text }
        <i
          className='ion-close-circled'
          onClick={ this.props.onClose }
          >
        </i>
      </div>
    );
  }
}

Alert.propTypes = {
  onClose: React.PropTypes.func,
  timeout: React.PropTypes.number,
  message: React.PropTypes.object.isRequired
};

Alert.defaultProps = {
  timeout: 3000
};
