import React from 'react';
// import ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {observable, action, makeObservable} from "mobx";
import './App.css';
import {TrackPlace} from "./TrackPlace";
import {TrackInfoMachine, Track} from "./TrackInfoMachine";
import {Map, MapMachine} from "./Map";
import {NavigationMachine, CurrentPlace} from "./NavigationMachine";

class AppMachine
{
  public trackInfoMachine: TrackInfoMachine;
  public navMachine: NavigationMachine = new NavigationMachine();
  public mapMachine: MapMachine = new MapMachine();

  constructor() 
  {
    // makeObservable(this);
    this.trackInfoMachine = new TrackInfoMachine();
    this.trackInfoMachine.fetchInfo();
  }
}

// { process.env.NODE_ENV === 'production' ?
//   <p>
//     This is a production build from create-react-app.
//   </p>
// : <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
// }

export interface AppProps
{

}

@observer
class App extends React.Component<AppProps>
{
  private machine: AppMachine;

  constructor(props: AppProps)
  {
    super(props);
    this.machine = new AppMachine();
  }

  render()
  {
    return (
      <div className="App">
        <header className="App-header">
          {
            this.machine.navMachine.currentPlace === CurrentPlace.HOME &&
            <>
              {
                this.machine.trackInfoMachine.tracks != null && 
                this.machine.trackInfoMachine.tracks.map((track: Track) => {
                  return <div key={track.name}>
                    <button onClick={() => this.machine.navMachine.goToTrackPage(track)}>{track.name}</button>
                  </div>;
                })
              }
            </>
          }
          {
            this.machine.navMachine.currentPlace === CurrentPlace.TRACK &&
            <TrackPlace
              trackInfo={this.machine.trackInfoMachine}
              navMachine={this.machine.navMachine}
            />
          }
          {
            this.machine.navMachine.currentPlace === CurrentPlace.MAP &&
            <Map
              trackInfoMachine={this.machine.trackInfoMachine}
              machine={this.machine.mapMachine}
              navMachine={this.machine.navMachine}
            />
          }
        </header>
      </div>
    );
  }
}

export default App;
