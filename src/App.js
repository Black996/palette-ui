import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import { generatePalette } from "./colorHelpers";
import NewPaletteForm from './NewPaletteForm';


class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    this.state = { palettes: savedPalettes ? savedPalettes : seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    })
  }

  deletePalette(id) {
    this.setState(st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }), this.syncLocalStorage)
  }

  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage);
  }

  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    const { palettes } = this.state;
    return (
      <Switch>
        <Route exact path="/palette/new" render={((routeProps) => (<NewPaletteForm
          savePalette={this.savePalette}
          palettes={palettes}
          {...routeProps}
        />))} />
        <Route
          exact path="/"
          render={(routeProps) => <PaletteList palettes={palettes} {...routeProps} deletePalette={this.deletePalette} />} />
        <Route
          exact path="/palette/:id"
          render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
        <Route
          exact path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} />)}
        />
      </Switch>

    )
  }
}

export default App;

