import React from "react";
// import "./styles.css";
import { Formik } from "formik";
import { getItems, getInfo, getChoices, getQuestions } from '@alheimsins/b5-johnson-120-ipip-neo-pi-r';
import { Box, Button, Flex } from "@chakra-ui/core";
// import {Center} from "@chakra-ui/react"

import router, { Router, useRouter } from "next/router";
// import { Link } from "react-router-dom";
// import { useTempResultMutation } from "../generated/graphql";
import getResult from '@alheimsins/b5-result-text';

const calculateScore = require('b5-calculate-score')


// console.log(getItems())

//yay

export default function Test() {
//     const [ , tempresult ] = useTempResultMutation()
// console.log(tempresult)
const router = useRouter();

  return (
    <div className="App">
      <Questions />
    </div>
  );
}

const questions = getItems() ;

class Questions extends React.Component<{} , {questions}> {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };

  }


  userSelection(qobjs) {
    const initialValues = [];
    for (let i = 0; i < qobjs.length ; i++) {
      initialValues.push({  domain: qobjs[i].domain , facet: qobjs[i].facet ,  score: 0  });
    }

    return initialValues;
  }


  componentDidMount() {
    // Fetch all the questions and set state
    this.setState({ questions });
  } 

  

   handleSubmit = async (values, formikProps) => {
    console.log("hello");

      setTimeout(() => {
        console.log("resolved timeout at onSubmit");
      }, 5000);
  };
//   handleSubmit(){
    //   console.log("hello world")
//   }

  render() {
    const { questions } = this.state;
    const userSelection = { answers: this.userSelection(questions) };
    // console.log(userSelection);
  


// /router.push ({pathname: '/changestate', query : { id : JSON.stringify((values), null, 2) }  })
//  router.push ({pathname: '/changestate', query : { id : calculateScore(values) }  })
// router.push ({pathname: '/changestate', query : { id :  JSON.stringify(calculateScore(values)) }  })
//theres calculate scores, which returns an objetc of 5 entries, with each entry being a domain and within it some facet scores.
// also there is getresults, which takes a score and returns a descriptions for each facet as well as a description of the score of each of the 5 demisnsions 

    return (
      <Flex mt="10" justify="center">
      <Formik enableReinitialize={true} initialValues={userSelection} onSubmit={this.handleSubmit}>

        {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
            <Flex  justify="center" >
          <form onSubmit={(event) => {event.preventDefault(); console.log(values);  console.log(calculateScore(values)) ; console.log(getResult({scores: calculateScore(values) , lang : 'en'}));  
 }}>  
            {questions.map((q, index) => ( 
              <Box mb = "6px"  boxShadow="xl" p="6" rounded="md" bg="#E6FFFA"  className="card" key={index}>
                <Box className="card-header"></Box>
                <Box className="card-body">
                  <h6 className="card-title">{q.text}</h6>
                  <Box className="question-choices px-2">
                     {/* {q.choices.map(choice => console.log(choice.score))}  */}
                    {q.choices.map(choice => (
                      <Box className="form-check" key={choice.score}>
                          <label>
                        <input
                          type="radio"
                          id={choice.score}
                          className="form-check-input"
                          name={`answers[${index}].score`}
                          value={choice.score}
                        //   checked={
                        //     values.answers && values.answers[index]
                        //       ? values.answers[index].score === choice.score
                        //       : false
                        //   }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        
                          <span className="mr-2"> </span>{" "}
                          {choice.text}
                        </label>
                      </Box>
                 
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            {/* <Button
              type="submit"
              className="btn btn-primary"
            //   disabled={isSubmitting}
              colorScheme = "solid"
            >
              Submit
            </Button> */}
            {/* <Link 
  to={{
    pathname: `/myresult/`,
    state: {
      description: values
    }
  }}> */} 
            <Button
             
                loadingText="Submitting"
                colorScheme="teal"
                   variant="solid"
                type="submit"

  >             
    Submit
  </Button>
  {/* </Link> */}
          </form>
          </Flex>
        )}
      </Formik>
      </Flex>

    );
  }
}

