import React from 'react';
import axios from 'axios';
import Loading from '../Loading';
import autoBind from 'react-autobind';
class Image extends React.Component{
    constructor(){
        super();
        this.state = {
            image: null
        }
        autoBind(this);
    }
    componentDidMount(){
        this.getImage()
    }
    getImage(){
        var self = this;
        axios.post("/image", {name: this.props.imageName}).then(function(resp){
            var data = resp.data;
            if(data.success){
                self.setState({image: data.file})
            } else{
                //TODO: Add else code
            }
        })
    }
    render(){
        return (this.state.image)?<img className="image" src={"data:image/png;base64," + this.state.image}/>:<Loading/>
    }
}

export default Image;