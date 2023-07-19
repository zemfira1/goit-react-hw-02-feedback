import {Component} from 'react';
import { Container } from "./App.styled";
import { Statistics } from '../Statistics';
import { FeedbackOptions } from '../FeedbackOptions'
import { Section } from '../Section'
import { Notification } from '../Notification';

export class App extends Component{
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  calculateValues = {
    total: 0,
    positivePercentage: 0
  }

    countTotalFeedback = () => {
    this.calculateValues.total += 1;
  }

  countPositiveFeedbackPercentage = () => {
    let goodFeedback = this.state.good;
    let totalFeedbak = this.calculateValues.total;
    this.calculateValues.positivePercentage = Math.round((goodFeedback / totalFeedbak)*100);
  }
  
  onLeaveFeedback = (state) => {
    this.countTotalFeedback();
    this.countPositiveFeedbackPercentage();

    this.setState(prevState => ({
     [state]: prevState[state] + 1
    })) 
  }

  render() {   
    const options = Object.keys(this.state);
    const onLeaveFeedback = this.onLeaveFeedback;
    const good = this.state.good;
    const neutral = this.state.neutral;
    const bad = this.state.bad;
    const total = this.calculateValues.total;
    const positivePercentage = this.calculateValues.positivePercentage;
    
    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={onLeaveFeedback}>
          </FeedbackOptions>
        </Section>

        <Section title="Statistics">
          {total===0? <Notification message="There is no feedback"/> : 
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}>
          </Statistics>}
        </Section>
      </Container >
    );
  }  
}


