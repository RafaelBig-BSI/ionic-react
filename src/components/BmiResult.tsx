import React from 'react';

import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

const BmiResult: React.FC<{result: number}> = (props) => {
    return(
        <IonRow>
            <IonCol>
                <IonCard>
                <IonCardContent className='ion-text-center'>
                    <h2>Your Body Mass Index (BMI)</h2>
                    <h3><strong>{props.result.toFixed(2)}</strong></h3>
                </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );
}

export default BmiResult;