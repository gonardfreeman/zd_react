import React, {Component} from 'react';

const editField = (id, data, name, func=null) => (
    <div className="editField">
        <label htmlFor={id} className="editInfo_label">{name}: </label>
        <input type="text" 
            className="editInfo_input" 
            id={id} 
            defaultValue={data} 
            placeholder={name}/>
    </div>
)

class EditField extends Component {
    render(){
        const {id, name, data, func} = this.props.opt;
        return (
            <div className="editField">
                <label htmlFor={id} className="editInfo_label">{name}: </label>
                <input type="text" 
                    className="editInfo_input" 
                    id={id}
                    onChange={func}
                    defaultValue={data} 
                    placeholder={name}/>
            </div>
        )
    }
}

export default EditField;