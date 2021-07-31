import React from 'react';
import shortid from 'short-id';
import { Container, Row, Col } from 'reactstrap';
import MainContent from './components/main-content';
import Sidebar from './components/sidebar';
import POLLS from './data/polls';

class App extends React.Component {

    state={
        polls: [],
        selectedpoll: {},
        searchTerm: '',
    }

    componentDidMount() {
        this.setState({polls: POLLS})
    }

    addNewPoll = poll => {
        poll.id = shortid.generate()
        poll.created = new Date()
        poll.totalVote = 0
        poll.opinions = []

        this.setState({
            polls: this.state.polls.concat(poll)
        })
    }

    updatePoll = updatedPoll => {
        const polls = [...this.state.polls]
        const poll = polls.find(p=> p.id == updatedPoll.id)

        poll.title = updatedPoll.title
        poll.description = updatedPoll.description
        poll.options = updatedPoll.options


        this.setState({polls})
    };

    deletePoll = pollId => {
        const polls = this.state.polls.filter(p=> p.id !== pollId);
        this.setState({polls, selectedpoll: {} });
    };

    selectPoll = pollId => {
        const poll = this.state.polls.find(p=> p.id == pollId);
        this.setState({selectPoll: poll });
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col md={4}>
                        <Sidebar />
                    </Col>
                    <Col md={8}>
                        <MainContent />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default App;