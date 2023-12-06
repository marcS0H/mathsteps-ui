import React, { useState } from 'react';
import mathsteps from 'mathsteps';
import { Divider } from 'primereact/divider';

const explanations = {
  "ADD_TO_BOTH_SIDES": "Ajouter des deux côtés",
  "BREAK_UP_FRACTION": "Décomposer la fraction",
  "CANCEL_MINUSES": "Annuler les signes moins",
  "COLLECT_AND_COMBINE_LIKE_TERMS": "Collecter et combiner les termes semblables",
  "COLLECT_LIKE_TERMS": "Collecter les termes semblables",
  "DIVIDE_FROM_BOTH_SIDES": "Diviser des deux côtés",
  "FACTOR_SYMBOL": "Factoriser le symbole",
  "FIND_GCD": "Trouver le PGCD (plus grand commun diviseur)",
  "FIND_ROOTS": "Trouver les racines",
  "MULTIPLY_TO_BOTH_SIDES": "Multiplier des deux côtés",
  "SIMPLIFY_ARITHMETIC": "Simplifier l'arithmétique",
  "SIMPLIFY_DIVISION": "Simplifier la division",
  "SIMPLIFY_LEFT_SIDE": "Simplifier le côté gauche",
  "SIMPLIFY_RIGHT_SIDE": "Simplifier le côté droit",
  "SIMPLIFY_TERMS": "Simplifier les termes",
  "SOLVE_FOR_SYMBOL": "Résoudre pour le symbole",
  "SUBTRACT_FROM_BOTH_SIDES": "Soustraire des deux côtés",
  "REDUCE_ZERO_NUMERATOR": "Réduire un numérateur à zéro",
  "REMOVE_ADDITION_OF_ZERO": "Enlever l'addition de zéro",
  "REMOVE_DIVISION_BY_ONE": "Enlever la division par un",
  "REMOVE_EXPONENT_BY_ONE": "Enlever l'exposant par un",
  "REMOVE_MULTIPLICATION_BY_ONE": "Enlever la multiplication par un",
  "REMOVE_MULTIPLICATION_BY_NEGATIVE_ONE": "Enlever la multiplication par moins un",
  "REARRANGE_COEFF": "Réarranger le coefficient",
  "REDUCE_EXPONENT_BY_ZERO": "Réduire l'exposant à zéro",
  "REDUCE_FRACTION": "Réduire la fraction",
  "SIMPLIFY_FRACTION": "Simplifier la fraction",
  "SIMPLIFY_SIGN": "Simplifier le signe",
  "SORT_TERMS": "Trier les termes",
  "UNARY_MINUS_TO_NEGATIVE_ONE": "Transformer le moins unaire en moins un"
}
 

const EquationSolver = () => {
  const [equation, setEquation] = useState('');
  const [solutionDetails, setSolutionDetails] = useState([]);

  const solveEquation = () => {
    try {
      const steps = mathsteps.solveEquation(equation);
      const detailedSteps = steps.map(step => ({
        beforeChange: step.oldEquation.ascii(),
        changeType: step.changeType,
        afterChange: step.newEquation.ascii(),
        substepsCount: step.substeps.length
      }));
      setSolutionDetails(detailedSteps);
    } catch (error) {
      console.error('Error solving equation:', error);
      setSolutionDetails([]);
    }
  };

  return (
    <div className='grid'>
      <div className='col-8 col-offset-2'>
        <textarea 
          value={equation} 
          onChange={(e) => setEquation(e.target.value)}
          placeholder="Entrer équation (ex: 2x + 3 = 15)"
          className='w-full'
        />
        <button onClick={solveEquation}>Résoudre</button>
        <div>
          {solutionDetails.map((detail, index) => (
            <div key={index}>
              <Divider></Divider>
              <p>Avant: {detail.beforeChange}</p>
              <p>Action: {explanations[detail.changeType]}</p>
              <p>Après: {detail.afterChange}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquationSolver;
