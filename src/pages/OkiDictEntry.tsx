import React from 'react';
import { IonList } from '@ionic/react';
// import { IonAccordion, IonAccordionGroup } from '@ionic/react';
import { v4 as uuidv4 } from 'uuid';
import './Tab1.css';
// import { Profiler } from 'react';
// import Perf from 'react-addons-perf';

const reactStringReplace = require('react-string-replace');
const indexToIDDict = Object.entries(require('../static/okinawa_01_index-table.json')).map((d: any) => (d[1].map((e: any) => [d[0], e]))).flat();
const okiDict = require('../static/okinawa_01.json');
// const indexToIDDict = okiDict.map((entry: any) => (entry['index'].map((index: string) => [index, entry['id']]))).flat();
function OkiDictEntry({ entryID }: { entryID: number }): any {
    const okiDictEntry = okiDict[entryID];
    return (
        <>
            <div className="ion-padding" slot="content">
                {JSON.stringify(Object.keys(okiDictEntry))} <br />
                ID: {okiDictEntry.id}
                <h4>発音</h4>
                <PronunciationTable phonetics_obj={okiDictEntry.phonetics} accent={okiDictEntry.accent} />
                <h4>品詞</h4>
                <p>[{okiDictEntry.pos.type}]</p>
                <h4>意味</h4>
                <Meaning meanings={okiDictEntry.meaning} />
                {okiDictEntry.pos.conjugation &&
                    (<ConjugationTable conjugation={okiDictEntry.pos.conjugation} />)}
            </div>
        </>
    );
}
const replaceString = (paragraph: string | string[], phonetics: any) => {
    const target_oki = phonetics.phonemes.simplified
    const pronunciation = phonetics.pronunciation
    const heimin_kana = pronunciation.HEIMIN.kana[0]
    const heimin_ipa = pronunciation.HEIMIN.IPA
    let replacement = <><i>{heimin_kana}</i> 〔{heimin_ipa}〕</>;
    if (pronunciation.SHIZOKU) {
        const shizoku_pro = pronunciation.SHIZOKU
        replacement = <>{replacement} (士:<i>{shizoku_pro.kana[0]}</i>〔 {shizoku_pro.IPA} 〕)</>;
    }
    // reactStringReplace の返り値が配列のため、最初の string とそれ以降の string[] で処理を変える。
    if (typeof paragraph === "string") {
        return reactStringReplace(paragraph, target_oki, (match: string, i: number) => (
            <span key={`${match}-${i}`}>{replacement}</span>
        ));
    } else if (Array.isArray(paragraph)) {
        return paragraph.map((p: string, i: number) =>
            reactStringReplace(p, target_oki, (match: string, j: number) => (
                <span key={`${match}-${i}-${j}`}>{replacement}</span>
            ))).flat();
    }
};

const RenderOkinawagoSentence = ({ okiEntry }: any) => (
    <>
        <i>{okiEntry.pronunciation.HEIMIN.kana[0]}</i>
        {okiEntry.pronunciation.SHIZOKU &&
            <>士: <i> {okiEntry.pronunciation.SHIZOKU.kana[0]} </i></>}
        <br />
        〔{okiEntry.pronunciation.HEIMIN.IPA}
        {okiEntry.pronunciation.SHIZOKU ?
            <span>士: {okiEntry.pronunciation.SHIZOKU.IPA}</span> :
            <></>
        }
        〕
    </>
);

// const getUniqueList = (a: Array<any>): Array<any> => {
//   return Array.from(new Set(a.map(JSON.stringify))).
//     map((key: unknown) =>
//       (typeof key === "string" ? JSON.parse(key) : ""));
// };

const Meaning = ({ meanings }: any) => (
    <>
        <IonList >
            {meanings.map((meaning: any) =>
                <div key={uuidv4(meaning)}>
                    <IonList key={uuidv4(meaning)}>
                        {meaning && meaning.map((paragraph: any) =>
                        (
                            <p key={uuidv4(paragraph)}>
                                {paragraph.yamato ?
                                    (paragraph.okinawago ?
                                        Array.from(new Set(paragraph.okinawago.map(JSON.stringify))).
                                            map((key: unknown) =>
                                                (typeof key === "string" ? JSON.parse(key) : "")).
                                            reduce((acc: string | string[], currVal: any) => (replaceString(acc, currVal)), paragraph.yamato) :
                                        paragraph.yamato) :
                                    paragraph.okinawago ? <RenderOkinawagoSentence okiEntry={paragraph.okinawago}></RenderOkinawagoSentence> : ""
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

export default OkiDictEntry;