import React from 'react';
import {Form,FormGroup,FormFeedback,Input,CustomInput,Label,Button} from 'reactstrap';

class ParticipationForm extends React.Component {
    state = {
        name: '',
        selectedOption: '',
        errors: {}
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        const { errors, isValid } = this.validate();

        if(isValid){
            this.props.getOptions({
                pollId: this.props.poll.id,
                name: this.state.name,
                selectedOption: this.state.selectedOption
            });
            event.target.reset();
            this.setState({
                name: "",
                selectedOption: "",
                errors: {}
            });
        }else{
            this.setState({ errors });
        }
    };

    validate = () => {
        const errors = {};
        if(!this.state.name){
            errors.name = "Please Provide a Name";
        }else if(this.state.name.length > 20){
            errors.name = "Name Too Long";
        }
        
        if(!this.state.selectedOption){
            errors.selectedOption = "Please Select one Option";
        }

        return{
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    };
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className="d-flex">
                    <h4>Options</h4>
                    <Button 
                        color="warning" 
                        type="button" 
                        className="ml-auto" 
                        onClick={this.props.toggleModal}
                    >
                        Edit
                    </Button>
                    <Button  
                        type="button" 
                        className="ml-2" 
                        onClick={ ()=> this.props.deletePoll(this.props.poll.id)}
                    >
                        Delete
                    </Button>
                </div>
                {
                    this.props.poll.options.map(opt =>(
                        <FormGroup className="my-2" key={opt.id}>
                            <label className="d-flex">
                                <CustomInput 
                                    type="radio" 
                                    id={opt.id} 
                                    value={opt.id} 
                                    name="selectedOption" 
                                    onChange={this.handleChange} 
                                    invalid={this.state.errors.selectedOption ? true : false} 
                                />
                                {opt.value}
                                <span 
                                    style={{
                                        padding: '5px 20px',
                                        background: 'green',
                                        color: 'white',
                                        borderRadius: '5px'
                                    }}
                                    className="ml-auto"
                                >
                                    {opt.vote}   
                                </span>
                                <span 
                                    style={{
                                        padding: '5px 20px',
                                        background: 'green',
                                        color: 'white',
                                        borderRadius: '5px'
                                    }}
                                    className="ml-auto"
                                >
                                    {this.props.poll.totalVote > 0 
                                        ? (
                                            (100 * opt.vote) / this.props.poll.totalVote
                                            ).toFixed(2)
                                            : 0}%
                                </span>
                            </label>
                        </FormGroup>
                    ))
                }
                <FormGroup className="my-3">
                    <Label>Enter your name</Label>
                    <Input 
                        name= 'name'
                        placeholder= "Moon Kabir"
                        value= {this.state.value}
                        onChange={this.handleChange}
                        invalid = {this.state.errors.name ? true : false}
                    />
                    {this.state.errors.name && <FormFeedback>{this.state.errors}</FormFeedback>}
                </FormGroup>
                <Button type="submit">Submit Your Opinion</Button>
            </Form>
        )
    }
}
export default ParticipationForm;