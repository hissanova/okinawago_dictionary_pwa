import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonLabel, IonList } from '@ionic/react';
// import { IonInput } from '@ionic/react';
import { IonAccordion, IonAccordionGroup } from '@ionic/react';
import { v4 as uuidv4 } from 'uuid';
import './Tab1.css';
const reactStringReplace = require('react-string-replace');
const indexToIDDict = Object.entries(require('../static/okinawa_01_index-table.json')).map((d: any) => (d[1].map((e: any) => [d[0], e]))).flat();
const okiDict = require('../static/okinawa_01.json');
// const indexToIDDict = okiDict.map((entry: any) => (entry['index'].map((index: string) => [index, entry['id']]))).flat();

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

const RenderEntry = ({ okiDictEntry }: any) => (
  <>
    <div className="ion-padding" slot="content">
      {JSON.stringify(Object.keys(okiDictEntry))} <br />
      ID: {okiDictEntry.id}
      <h4>発音</h4>
      {/* {JSON.stringify(okiDictEntry.phonetics)} */}
      <PronunciationTable phonetics_obj={okiDictEntry.phonetics} accent={okiDictEntry.accent} />
      <h4>品詞</h4>
      {/* {JSON.stringify(okiDictEntry.pos)} */}
      <p>[{okiDictEntry.pos.type}]</p>
      <h4>意味</h4>
      {JSON.stringify(okiDictEntry.meaning)} <br />
      <Meaning meanings={okiDictEntry.meaning} />
      {okiDictEntry.pos.conjugation &&
        (<ConjugationTable conjugation={okiDictEntry.pos.conjugation} />)}
    </div>
  </>
);

const replaceString = (paragraph: string, phonetics: any) => {
  const target_oki = phonetics.phonemes.simplified
  const pronunciation = phonetics.pronunciation
  const heimin_kana = pronunciation.HEIMIN.kana[0]
  const heimin_ipa = pronunciation.HEIMIN.IPA
  let replacement = <><i>{heimin_kana}</i> 〔{heimin_ipa}〕</>;
  if (pronunciation.SHIZOKU) {
    const shizoku_pro = pronunciation.SHIZOKU
    replacement = <>{replacement} (士:<i>{shizoku_pro.kana[0]}</i>〔 {shizoku_pro.IPA} 〕)</>;
  }
  return reactStringReplace(paragraph, target_oki, () => (
    replacement)
    // return reactStringReplace(paragraph, target_oki, (match: string, i: number) => (
    //   replacement)
  );
};

const RenderOkinawagoSentence = ({ okiEntry }: any) => (
  <>

    {/* {JSON.stringify(okiEntry)} */}
    <i>{okiEntry.pronunciation.HEIMIN.kana[0]}</i>
    {okiEntry.pronunciation.SHIZOKU &&
      <>士: <i> {okiEntry.pronunciation.SHIZOKU.kana[0]} </i></>}
    <br />
    〔{okiEntry.pronunciation.HEIMIN.IPA}
    {okiEntry.pronunciation.SHIZOKU ?
      <span>士: {okiEntry.pronunciation.SHIZOKU.IPA}</span> : <></>
    }
    〕
  </>
);

const Meaning = ({ meanings }: any) => (
  <>
    <IonList slot="content">
      {meanings.map((meaning: any) =>
        <div key={uuidv4(meaning)}>
          {/* {Object.defineProperty(meaning, "hoge", { value: "hoge" })} */}
          <IonList key={uuidv4(meaning)}>
            {meaning && meaning.map((paragraph: any) =>
            (
              <p key={uuidv4(paragraph)}>
                key1={uuidv4(meaning)}, key2={uuidv4(meaning)} key3={uuidv4(paragraph)} <br />
                {uuidv4(meaning.yamato) == uuidv4(meaning) ? console.log(uuidv4(meaning.yamato), uuidv4(meaning)) : ""}

                {paragraph.yamato ?
                  // JSON.stringify(paragraph.yamato) + JSON.stringify(paragraph.okinawago)
                  (paragraph.okinawago ?
                    paragraph.okinawago.reduce((acc: string, currVal: any) => (replaceString(acc, currVal)), paragraph.yamato) :
                    paragraph.yamato) :
                  <RenderOkinawagoSentence okiEntry={paragraph.okinawago}></RenderOkinawagoSentence>
                }
              </p>
            ))
            }
          </IonList>
        </div>
      )}

    </IonList>
  </>
);

const PronunciationTable = ({ phonetics_obj, accent }: any) => (
  <>
    <table >
      <tbody>
        <tr>
          <th >音素</th>
          <td >
            {phonetics_obj.phonemes.original}
            ({phonetics_obj.phonemes.original != phonetics_obj.phonemes.simplified ?
              (phonetics_obj.phonemes.simplified) : ("")
            })
          </td>
        </tr>
        <tr>
          <th >カナ</th>
          <td >
            {phonetics_obj.pronunciation.HEIMIN.kana}
            {phonetics_obj.pronunciation.SHIZOKU ?
              ", (士) " + (phonetics_obj.pronunciation.SHIZOKU.kana[0]) : ("")
            }
          </td>
        </tr>
        <tr>
          <th >IPA</th>
          <td >
            〔{phonetics_obj.pronunciation.HEIMIN.IPA}〕
            {phonetics_obj.pronunciation.SHIZOKU ?
              ", (士) 〔" + (phonetics_obj.pronunciation.SHIZOKU.IPA) + "〕" : ("")
            }
          </td>
        </tr>
        <tr>
          <th >アクセント</th>
          <td >{accent}</td>
        </tr>

      </tbody>
    </table>
  </>
);

const ConjugationTable = ({ conjugation }: any) => (
  <>
    <h4>活用</h4>
    {JSON.stringify(conjugation)}
  </>
);

const AccordionHeader = ({ id, result, searchTerm }: any) => (
  <IonItem key={id} slot="header" color="light"  >
    <IonLabel>
      {reactStringReplace(result[0], searchTerm, (match: string) => (
        <b>{match}</b>
      ))} ID:{uuidv4(result[1])}, key:{`${id}-1`}
    </IonLabel>
  </IonItem>
)
const WordAccordion = ({ id, result, searchTerm }: any) => (
  // <IonAccordionGroup >
  <IonAccordion value={`${id}-0`}>
    <AccordionHeader key={`${id}-header`} result={result} searchTerm={searchTerm} id={id} />

    {JSON.stringify(result)} <br />
    {/* <RenderEntry key={`${id}-${uuidv4(result[1])}`} okiDictEntry={okiDict[result[1]]} /> */}
  </IonAccordion>
  // </IonAccordionGroup>
)
function Tab1() {
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
        {/* <IonList> */}
        <IonAccordionGroup >
          {results.map((result: [string, any], objectID: number) => {
            const id = uuidv4(result[1]);
            return (
              // <WordAccordion key={objectID} result={result} searchTerm={searchTerm} id={id} />
              <IonAccordion key={`accordion-${id}`} value={id}>
                <IonItem key={`accordion-item-${id}`} slot="header" color="light">
                  <IonLabel>
                    {reactStringReplace(result[0], searchTerm, (match: string) => (
                      <b>{match}</b>
                    ))} ID:{uuidv4(result[1])}
                  </IonLabel>
                </IonItem>
                {JSON.stringify(result)} <br />
                <RenderEntry okiDictEntry={okiDict[result[1]]} />
              </IonAccordion>
            )
          }
          )}
          {/* </IonList> */}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
}

export default Tab1;
