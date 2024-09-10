import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonSearchbar, IonItem, IonLabel, IonList } from '@ionic/react';
import { IonAccordion, IonAccordionGroup } from '@ionic/react';
import './Tab1.css';
const reactStringReplace = require('react-string-replace');
const okiDict = require('../static/okinawa_01.json');
const indexToIDDict = okiDict.map((entry: any) => (entry['index'].map((index: string) => [index, entry['id']]))).flat();

const useStorageState = (key: string, initialState: string): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(
    () => { localStorage.setItem(key, value) },
    [value]
  );
  return [value, setValue];
};

type searchItems = { handleInput: (e: Event) => void, searchTerm: string };
const Search = ({ handleInput, searchTerm }: searchItems) => (
  <>
    <IonSearchbar
      debounce={1000}
      onIonInput={(ev) => handleInput(ev)}
      animated={true}
      placeholder="かなで入力"
    ></IonSearchbar>
    <p>
      Searching for <strong>{searchTerm}</strong>.
    </p>
  </>
);

type resultsLen = { len: number };
const Message = ({ len }: resultsLen) => {
  if (len == 0)
    return <p>検索ワードを入力して下さい。</p>;
  else
    return <p>{len} 件の見出し語がヒットしました。</p>;
}

const Tab1: React.FC = () => {
  const [searchTerm, setResults] = useStorageState('search', '');

  const handleInput = (ev: Event): void => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    console.warn(query, target);
    if (target) query = target.value!;
    setResults(query);
  };

  //const results = indexToIDDict.filter((d: any) => d[0].indexOf(searchTerm) > -1);
  const results = indexToIDDict.filter((d: any) => d[0].includes(searchTerm))
    .sort((d1: any, d2: any) => d1[0].indexOf(searchTerm) - d2[0].indexOf(searchTerm));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>沖縄語辞典</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">沖縄語辞典</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Search handleInput={handleInput} searchTerm={searchTerm} />
        <Message len={results.length}></Message>
        <IonList>
          {results.map((result: string, objectID: number) =>
          (
            <IonAccordionGroup key={objectID}>
              <IonAccordion >
                <IonItem slot="header" color="light">
                  <IonLabel>
                    {reactStringReplace(result[0], searchTerm, (match: string, i: number) => (
                      <b>{match}</b>
                    ))}
                  </IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  ID: {result[1]} <br />
                  発音: {okiDict[result[1]].pronunciation} <br />
                  品詞: {okiDict[result[1]].pos.type} <br />
                  意味: {okiDict[result[1]].meaning} <br />
                </div>
              </IonAccordion>
            </IonAccordionGroup>
          )
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
