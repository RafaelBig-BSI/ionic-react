import React, { useRef, useState } from 'react';
import {
   IonApp,
   IonAlert,
   IonCol,
   IonContent,
   IonGrid,
   IonHeader,
   IonInput,
   IonItem,
   IonLabel,
   IonRow,
   IonTitle,
   IonToolbar,
   setupIonicReact } from '@ionic/react';

import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControl from './components/InputControl';

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>(); //o state será do tipo number e espera receber um valor do tipo number.
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value; //"!" informa ao TypeScript que o valor nunca será nulo. Se não, tinha que colocar "?".
    const enteredHeight = heightInputRef.current!.value;
    
    //se os valores forem nulos ou string vazias
    if(!enteredHeight || !enteredWeight || +enteredWeight <= 0 || +enteredHeight <= 0)
    {
        setError('Please enter a valid (non-negative) input number.');
        return;
    }

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1; 

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi = weight / (height * height);

    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    heightInputRef.current!.value = '';
    weightInputRef.current!.value = '';
  };

  const clearError = () => {
    setError('');
  }

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  }

  return (
    <>
      {/* "!!" converte o valor da string error em um valor booleano real. Ou seja, se ela está ou não vazia. */}
      <IonAlert isOpen={!!error} message={error} buttons={[{text: 'Okay', handler: () => clearError }]} />

      <IonApp>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className='ion-padding'>
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl selectedValue={calcUnits} onSelectedValue={selectCalcUnitHandler} />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>Your Height ({calcUnits === 'mkg' ? 'meters' : 'feet'})</IonLabel>
                  <IonInput type='number' ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                    <IonLabel position='floating'>Your Weight ({calcUnits === 'mkg' ? 'kg' : 'lbs'})</IonLabel>
                    <IonInput type='number' ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            
            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />

            {
              calculatedBmi && (
                <BmiResult result={calculatedBmi} />
            )}
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  )
};

export default App;
