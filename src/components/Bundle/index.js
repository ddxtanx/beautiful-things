import React, { Component } from 'react'
import Loading from '../Loading';
import autoBind from 'react-autobind';
class Bundle extends Component {
    constructor(){
        super();
        this.state = {
            // short for "module" but that's a keyword in js, so "mod"
            mod: null
        }
        autoBind(this);
    }

  componentWillMount() {
    this.load(this.props)
    this.setState({
      mod: null
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    var self = this;
    this.setState({
      mod: null
    })
    props.load((mod) => {
      self.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : <Loading/>
  }
}

export default Bundle