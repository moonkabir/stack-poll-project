import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import ParticipationForm from './participate-form';
import pollForm from '../poll-form';

class MainContent extends React.Component {
    state ={
        openModal: false,
    };
    toggleModal = () => {
        this.setState({openModal: !this.state.openModal});
    };

    render() {
        if(Object.keys(this.props.poll).length === 0){
            return(
                <div>
                    <h3>Welcome to my application</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In possimus fugit dolorem labore non, ex nisi vitae ab totam alias sit maiores dignissimos vero consequuntur, blanditiis quasi excepturi. Nostrum architecto iste sit, ipsum ut eius tempora ea repellendus laborum deserunt voluptas totam, eaque commodi optio exercitationem accusamus ab dolores perferendis.</p>
                </div>
            );
        }
        const{ poll, getOpinion, updatedPoll, deletePoll } = this.props
        return (
            <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <br />
                <ParticipationForm 
                    poll={poll}
                    getOpinion = {getOpinion}
                    toggleModal = {this.toggleModal}
                    deletePoll = {deletePoll}
                />
                <Modal
                    isOpen = {this.state.openModal}
                    toggle = {this.toggleModal}
                    unmountOnClose = {true}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Update poll
                    </ModalHeader>
                    <ModalBody>
                        <pollForm 
                            poll={poll}
                            isUpdate = {true}
                            submit = {updatedPoll}
                            buttonValue = "Update Poll"
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default MainContent;