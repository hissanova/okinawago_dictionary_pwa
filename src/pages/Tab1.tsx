import React, { Profiler } from 'react';
import { Suspense, lazy } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonLabel, IonList } from '@ionic/react';
import { IonAccordion, IonAccordionGroup } from '@ionic/react';
import { v4 as uuidv4 } from 'uuid';
import './Tab1.css';
// import OkiDictEntry from './OkiDictEntry';

const OkiDictEntry = lazy(() => import('./OkiDictEntry'));

const reactStringReplace = require('react-string-replace');
const indexToIDDict = Object.entries(require('../static/okinawa_01_index-table.json')).map((d: any) => (d[1].map((e: any) => [d[0], e]))).flat();

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
      検索ワード &quot;<strong>{searchTerm}</strong>&quot; での検索結果。
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


const SearchResults = ({ results, searchTerm }: any) => (
  <>
    {
      results.length > 0 ?
        <IonAccordionGroup >
          {results.map((result: [string, any], objectID: number) => (
            <IonAccordion key={`accordion-${objectID}`} value={`${objectID}`}>
              <IonItem slot="header" color="light">
                <IonLabel >
                  <div>
                    {
                      reactStringReplace(result[0], searchTerm, (match: string, i: number) => (
                        <b key={i}>{match}</b>
                      ))
                    }
                  </div>
                </IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <Suspense fallback={<div>Loading...</div>}>
                  <OkiDictEntry entryID={result[1]} />
                </Suspense>
              </div>
            </IonAccordion>))
          }
        </IonAccordionGroup> :
        <></>
    }
  </>
)

function onRender(id: string, phase: string, actualDuration: number, baseDuration: number, startTime: number, commitTime: number) {
  console.log(`${id}'s ${phase} phase:`);
  console.log(`Actual time: ${actualDuration}`);
  console.log(`Base time: ${baseDuration}`);
  console.log(`Start time: ${startTime}`);
  console.log(`Commit time: ${commitTime}`);
}

function Tab1() {
  const [searchTerm, setResults] = useStorageState('search', '');

  const handleInput = (ev: Event): void => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    console.warn(query, target);
    if (target) query = target.value!;
    setResults(query);
  };
  const results = indexToIDDict.filter((d: any) => d[0].includes(searchTerm || "a"))
    .sort((d1: any, d2: any) => d1[0].indexOf(searchTerm) - d2[0].indexOf(searchTerm));
  console.log(results.length)

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
        <Message len={results.length} />
        <Profiler id="SearchResults" onRender={onRender}>
          <SearchResults results={results} searchTerm={searchTerm} />
        </Profiler>
      </IonContent>
    </IonPage>
  );
}

export default Tab1;
