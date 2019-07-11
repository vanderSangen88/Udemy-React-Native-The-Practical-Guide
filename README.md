# Udemy-React-Native-The-Practical-Guide

## Section 1: Getting Started

### #2 - What is React Native?

"Learn once, write everywhere". Platform specific adjustments in the native language.

### #3 - A Closer Look

Still use React, but not JSX -components but alternatives from React Native which will be compiled to platform specific components.

### #4 - What Happens to JavaScript?

Logic will stay; React Native will create a JavaScript environment where it will work.

### #5 - Creating Our First React Native App

> Setup "my-app" with Expo.

1. `create-native-react-app [name-app]`
2. `npm start`
3. Scan the QR-code.

### #6 - Dealing with Limitations of React Native

- No or very little Cross-Platform Styling of Components:  
**Style Components on your own or use Third-Party Libraries**

- Only a Basic Set of PreBuilt Component:  
**Build Components on your own or use Third-Pary Libraries**

- Tools to create Responsive Designs but no Responsiveness out of the Box:  
**Create Responsive Designs on your own (check for Device-Size and OS)**

### #11 - Useful Resources & Links

- [Quickly get started](https://facebook.github.io/react-native/docs/getting-started.html) (with create-react-native-app)
- Keep [the official docs](https://facebook.github.io/react-native/docs/tutorial.html) in mind for the rest of the course:
- [The create-react-native-app Github repo](https://github.com/react-community/create-react-native-app)
---

## Section 2: Diving into the Basics

### #14 - JSX Elements you Can and Can't Use
You can't use webelements in a React Native app.

A full list available on the official docs.

### #15 - Switching Away from create-react-native-app

1. Install Homebrew - The missing package manager for macOS.  
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. Install Node, Watchman & JDK with:  
`brew install node`  
`brew install watchman`  
`brew tap AdoptOpenJDK/openjdk`  
`brew cask install adoptopenjdk8`
3. Install the React Native CLI  
`npm install -g react-native-cli`
4. Create a new project
`react-native init [name-app]`

### #23 - Working on the App: Adding a Textinput

1) Import `TextInput`-component from react-native:  
2) Add the new self-closing component to the `View`;
3) Setup state property directly in the class
4) Bind `value` to `this.state.placeName` 
5) Add method to handle changes to the input
6) Connect the handler to the input
7) Update the state

*in App.js:*
```js
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native'; // 1

export default class App extends Component {
    state = { // 3
        placeName: ''
    }

    placeNameChangedHandler = val => { // 5
        this.setState({ // 7
            placeName: val
        })
    }

    render() {
        return (
            <View>
                <TextInput // 2
                    value={this.state.placeName} // 4
                    onChangeText={this.placeNameChangedHandler} // 6
                /> 
            </View>
        )
    }
}
```

### #24 - Styling - Understanding the Basics

Positioning elements by the Flexbox concept

### #25 - More on Flexbox

[A full list of supported properties](https://github.com/vhpoet/react-native-styling-cheat-sheet)

### #26 - Positioning Elements with Flexbox

1) Add a nested `View`-component
2) Create new style objects
3) Assign style objects to components

*in App.js:*
```js
...
    <View 
        style={styles.container}
    >
        <View // 1
            style={styles.inputContainer} // 3
        >
            <TextInput 
                style={styles.placeInput}
                placeholder="An awesome place"
                value={this.state.placeName} 
                onChangeText={this.placeNameChangedHandler} 
            />
            <Button
                style={styles.placeButton}
                title="Add"
            />
        </View>
    </View>
...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 50
  },
  inputContainer: { // 2
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});
```

### #27 - Adding a Button and Managing State

1) Add a new handler
2) Connect handler to the `Button`-component
3) Add new `places`-property to state
4) Add new `View`-component below input-view
5) Create a const which replaces the strings in JSX Elements to display inside the render statement before returning the JSX
6) Add output to the view
7) Add the unique `key` prop and assign the index of the map iterator.

*in App.js:*
```js
...
    state = {
        placeName: '',
        places: [] // 3
    }

    placeSubmitHandler = () => { // 1
        if (this.state.placeName)
    }

    render() {
        const placesOutput = this.state.places.map((place, i) => (
            <Text 
                key={i}
            >
                {place}
            </Text>
        ));

        return (
            <View>
            ...
                <Button
                    style={styles.placeButton}
                    title="Add"
                    onPress={this.placeSubmitHandler} // 2
                />
            </View>
            <View> // 4
                {placesOutput} // 6
            </View>
        )
    }

```

### #28 - Create a Custom Component

1) Create a new component in folder `src/components`
2) Create a functional component `listItem`
3) Import The `View`-component, which is more stylable then the `Text`-component
4) Expect props 
5) Display the `placeName`

*in src/components/ListItem/ListItem.js:*
```js
    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';

    const listItem = (props) => ( // 4
        <View style={styles.listItem}>
            <Text>
                {props.placeName} // 5
            </Text>
        </View>
    );

    const styles = StyleSheet.create({
        listItem: {
            width: "100%",
            padding: 10,
            backgroundColor: "#eee"
        }
    });

    export default listItem;
```

### #29 - Splitting up the App in multiple Components

- PlaceInput: a Class-based component which will handle the user input.
- PlaceList: a functional component.

*in App.js:*  
1) Import newly created `PlaceInput`-component
2) Use `PlaceInput`
3) Rename `placeSubmitHandler`-method to `placeAddedHandler` to be inline with the propname
4) Change the method to be able to receive the `placeName`
5) Change the method to concat the received `placeName`
6) Remove the `placeNameChangedHandler`-method
7) Hook up the `placeAddedHandler` to the custom component
8) Import newly created `PlaceList`-component
9) Use `PlaceList`
10) Pass `places`-prop

```js
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput'; // 1
import PlaceList from './src/components/PlaceList/PlaceList'; // 8

export default class App extends Component {
  state = {
    places: []
  };

  // - 6

  placeAddedHandler = placeName => { // 3 & 4
    this.setState(prevState => {
      return {
        places: prevState.places.concat(placeName) // 5
      };
    }) 
  }

  render() {
    return (
      <View 
        style={styles.container}
      >
        <PlaceInput onPlaceAdded={this.placeAddedHandler} /> // 2 & 7
        <PlaceList places={this.state.places} /> // 9 & 10
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 50,
    width: "100%"
  }
});
```

*in PlaceInput.js:*  
1) Import React
2) Create the `PlaceInput`-class
3) Export as default
4) Import relevant JSX to render
5) Import React Native Components
6) Import the styling
7) Import `StyleSheet`
8) Import relevant state


```js
import React, { Component } from 'react'; // 1
import { View, TextInput, Button, StyleSheet } from 'react-native'; // 5 & 7

class PlaceInput extends Component { // 2
    state = { // 8a
        placeName: ''
    };

    placeNameChangedHandler = val => { // 8b
        this.setState({
            placeName: val
        })
    }

    placeSubmitHandler = () => { // 8c
        if (this.state.placeName.trim() === "") {
            return
        }

        this.props.onPlaceAdded(this.state.placeName);
    }

    render() {
        // 4:
        <View 
            style={styles.inputContainer}
            >
            <TextInput 
                style={styles.placeInput}
                placeholder="An awesome place"
                value={this.state.placeName} 
                onChangeText={this.placeNameChangedHandler} 
            />
            <Button
                style={styles.placeButton}
                title="Add"
                onPress={this.placeSubmitHandler}
            />
        </View>
    }
}

const styles = StyleSheet.create({ // 6
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    placeInput: {
        width: "70%"
    },
    placeButton: {
        width: "30%"
    }
});

export default PlaceInput; // 3
```

*in PlaceList.js:*  
1) Create the functional `placeList`-component, which will receive some props and render some JSX
2) Import React
3) Import React Native Components
4) Export as default
5) Import relevant JSX to render
6) Import `placesOutput`-array
7) Import custom `ListItem`-component
8) Import `StyleSheet`-component
9) Import the styling
10) Replace `this.state.places` with `props.places`
```js
import React from 'react'; // 2
import { View, StyleSheet } from 'react-native'; // 3 & 8
import ListItem from './../ListItem/ListItem'; // 7

const placeList = props => { // 1
    const placesOutput = props.places.map((place, i) => ( // 6
        <ListItem 
          key={i}
          placeName={place}
        />
    ));

    return (
        <View style={styles.listContainer}> // 5
          {placesOutput}
        </View>
    )
};

const styles = StyleSheet.create({ // 9
    listContainer: {
        width: "100%"
    }
});

export default placeList; // 4
```

### #30 - Listening to Touch Events

> By default `onPress` isn't registered on any component
> Therefor React Native supplies some wrapper-components: `Touchable`-something, which does have the `onPress`-prop registered.
> `Touchable` is the parent class. Used by for example `TouchableWithoutFeedback`
> `TouchableWithoutFeedback` allows to register touch event on the element it wraps: MUST ONLY HAVE ONE CHILD ELEMENT

User Story: *By clicking on a page, we want to get rid of it*

*in ListItem.js:*
1) Import React Native's `TouchableWithoutFeedback`-component
2) Wrap the `View`-component with the imported component
3) Add the `onPress`-prop
4) Pass the `onItemPressed`-prop
```js
import { ..., TouchableWithoutFeedback } from 'react-native'; // 1
...
    <TouchableWithoutFeedback // 2
        onPress={props.onItemPressed} // 3 & 4
    >
        <View 
            ...
        >
            ...
        </View>
    </TouchableWithoutFeedback>
...
```

*in PlaceList.js:*
1) Add prop `onItemPressed`
```js
...
    <ListItem 
        ...
        onItemPressed // 1
    />
...
```

### #31 - Reacting to Press Events

*in PlaceList.js:*
1) Pass an anonymous function 
2) Call `onItemDeleted` and pass the index
```js
...
    <ListItem 
        ...
        onItemPressed={() => props.onItemDeleted(i)} // 1 & 2
    />
...
```

*in App.js:*
1) Add the `onItemDeleted`-prop to the `PlaceList`-component
2) Pass a `placeDeletedHandler`method to handle the passed index
```js
...
    placeDeletedHandler = index => {
        this.setState(prevState => {
            return {
                places: prevState.place.filter((place, i) => {
                    return i !== index;
                })
            }
        });
    }
...
    <PlaceList 
        ...
        onItemDeleted={this.placeDeletedHandler}
    />
...
```

### #32 - Using a ScrollView

> Using the `ScrollView` is very inefficient!
> It renders all items at once.

*in PlaceList.js:*
1) Replace React Native's `View`-component with the `ScrollView`-component
```js
...
import { ScrollView, StyleSheet } from 'react-native'; // 1a
...
    return (
        <ScrollView // 1b
            style={styles.listContainer}
        >
          {placesOutput}
        </ScrollView>
    )
...
```

### #33 - Rendering Lists Correctly

> Use FlatList! for one-dimensional arrays
> Or use SectionList for nested/multiple dimensional arrays

*in PlaceList.js:*
1) Replace React Native's `ScrollView`-component with the `FlatList`-component
2) Remove the `placesOutput` & it's array `.map`-method
3) Add the required `data`-prop (an array) to the `FlatList`-component, which holds the datasource.
4) Add the `renderItem`-prop to handle the output of the datasource
5) Pass an anonymous function which returns the JSX for each place in places
6) Remove the `key`-prop from the `ListItem`-component since the index is handled by the `FlatList`-component.
8) Pass the `info`-argument to the anonymous function which holds information about the item rendered.
9) Replace `place` with `info.item.value` which contains the placeName-string.
10) Replace `i` with `info.item.key` whick contains the unique-ish id
```js
...
import { FlatList, StyleSheet } from 'react-native'; // 1a
...
    // - 2

    return (
        <FlatList // 1b
            ... 
            data={props.places} // 3
            renderItem={(info) => ( // 4, 5 & 8
                <ListItem 
                    placeName={info.item.value} // 9
                    onItemPressed={() => props.onItemDeleted(info.item.key)} // 10
                />
            )}
        />
    )
...
```

*in App.js:*  
7) Change the concatination of the `placeName`-string to an object.  
11) Update the `placeDeletedHandler`-method to use the place-object  
```js
    ...
    placeDeletedHandler = index => {
        this.setState(prevState => {
        return {
            places: prevState.places.filter(place => {
                return i !== index;
            })
        }
        });
    }
    ...
    return {
        places: prevState.places.concat( // 7
            {
                key: Math.random(),
                value: placeName
            }
        )
    }
    ...
```

### #34 - Adding Static Images

*in App.js:*  
1) Import the `placeImage`   
2) Assign it to the `image`-property of the place-object  
3) Rename the `value`-property to `name`.  
```js
    ...
    import placeImage from './src/assets/beautiful-place.jpg'; // 1
    ...
    return {
        places: prevState.places.concat({
            ...
            name: placeName // 3
            image: placeImage // 2
        })
    }
    ...
```

*in PlaceList.js:*  
4) Rename the `value`-property to `name`.  
5) Add the `placeImage`-prop and pass the image from the place-object  
```js
    ...
    <ListItem
        placeName={info.item.name} // 4
        placeImage={info.item.image} // 5
        ...
    />
    ...
```

*in ListItem.js:*  
6) Import React Native's `Image`-component  
7) Add the `Image`-component  
8) Add the `source`-prop and pass the placeImage from props  
9) Alter the styling  
10) Connect styling  
```js
    ...
    import { ..., Image } from 'react-native'; // 6
    ...

        <View 
            style={styles.listItem}
        >
            <Image // 7
                style={styles.placeImage} // 10
                source={props.placeImage} // 8
                resizeMode="contain"
            />
            <Text>
                {props.placeName}
            </Text>
        </View>
    
    ...

    // 9:
    listItem: {
        ...
        flexDirection: "row",
        alignItems: "center"
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    }
    ...
```

### #35 - Using Network Images

*in App.js:*
1) Assign an object it to the `image`-property of the place-object
```js
    ...
    return {
        places: prevState.places.concat({
            ...
            image: {
                uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
            } 
        })
    }
    ...
```

### #36 - Adding a Modal
*in PlaceDetail.js:*
1) Import the `Modal`-component from react-native
```js
import { Modal } from 'react-native';
```

### #37 - React vs React Native

### #40 - Useful Resources & Links

- [Understand the Basics](https://github.com/react-community/create-react-native-app)
- [Understand Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [More about Images](https://facebook.github.io/react-native/docs/images.html)
---

## Section 3: Using Redux with React Native

### #41 - Module Introduction
> Better State Management Everywhere!

### #42 - A Brief Redux Refresher

### #44 - Installing Redux and Creating a Basic Setup

1) Create a new `store` folder inside of the `src`-folder.
2) Create a new `reducers`- and `actions`-folder inside the new `store`-folder.

> Actions are the dispatched messages
> Reducers are the places where the messages are accepted and the state is changed

3) Create a new `places`-reducer as the "rootReducer"

*in places.js:*  
4) Create a `reducer`-function which accepts the previous `state`, aswel as the `action` to handle   
5) Export the function as default  
6) Create a `initialState`-variable which hold the state at the start of the application.  
7) Import the properties (`places` & `selectedPlace`) of the state from App.js  
8) Set the default value of the `state`  
9) Create a typical switch-statement inside of the reducer function  
10) Setup default to return the state  
```js
const initialState = { // 6
    places: [],
    selectedPlace: null
};

const reducer = (state = initialState, action) => { // 4 & 8
    switch (action.type) { // 9
        default: // 10
            return state;
    }
};

export default reducer; // 5
```

### #45 - Setting Up Actions
1) Create a new `actionTypes.js`-file inside of the `src/actions`-folder.
2) Create constants defining the action types.

> Convention is to name the constant as the string in uppercase

*in actionTypes.js:*
```js
    // 2
    export const ADD_PLACE = 'ADD_PLACE';
    export const DELETE_PLACE = 'DELETE_PLACE';
    export const SELECT_PLACE = 'SELECT_PLACE';
    export const DESELECT_PLACE = 'DESELECT_PLACE';
```

> The Action Creator Idea is basically a couple of functions which return object which represents actions.
> Convenient when using asynchronous code or need to handle side effects.

3) Create a new `places.js`-file inside of the `src/actions`-folder to store the places related actions.
4) Create the functions and store them in constants

> An action needs to have the `type`-property

5) Import the actionTypes

*in places.js:*
```js
    import {ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE} from './actionTypes'; // 5

    // 4
    export const addPlace = (placeName) => {
        return {
            type: ADD_PLACE,
            placeName: placeName
        };
    };

    export const deletePlace = () => {
        return {
            type: DELETE_PLACE
        }
    };

    export const selectPlace = (key) => {
        return {
            type: SELECT_PLACE,
            placeKey: key
        }
    };

    export const deselectPlace = () => {
        return {
            type: DESELECT_PLACE
        }
    }
```

6) Create a new `index.js`-file inside of the `src/actions`-folder to bundle all exports
7) Export all action creators
*in index.js:*
```js
    export { addPlace, deletePlace, selectPlace, deselectPlace } from './places';
```

### #46 - Setting Up the Reducer

1) Import the actionTypes
2) Add the `ADD_PLACE`-case to the switch-statement
3) Copy the logic of the placeAddedHandler from App.js

> Never manipulate the old state, always return a new state!

4) Copy the properties of the old state by using the ES6 Spread Operator.
5) Overwrite the `places`-property with the copied logic.
6) Change `prevState` to `state`,
7) Change `placeName` to `action.placeName`

The same works for the other actiontypes

*in reducers/places.js:*
```js
   import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './../actions/actionTypes'; // 1

   ...

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case ADD_PLACE: // 2
                return {
                    ...state, // 4
                    places: state.places.concat({ //5 & 6
                        key: Math.random(),
                        name: action.placeName, // 7
                        image: {
                            uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
                        }
                    })
                };

            default:
                return state;
        }
    };
...
```

### #47 - Creating the Store

#### 1. Make React aware of Redux: whenever the app is mounted.

*in index.js:*
1) Import the `Provider`-component from react-redux.
> The `Provider`-component is a thin wrapper for the `App`-component

```js
...
import { Provider } from 'react-redux'; // 1
...
```

2) Create a new `configureStore.js`-file in the `src/store`-folder

*in configureStore.js:*  
3) Import `createStore` and `combineReducers` from redux  
4) Import reducers: `placesReducer`  
5) Create the `rootReducer`  
6) Pass a JS-object which maps any keys to the reducers  
7) Create the store - `configureStore`, a function.    
> The store could have arguments if the store would be created dynamically.
8) return a call to `createStore` and pass it the `rootReducer`
> createStore expects one single reducer
9) export `configureStore` as the default
```js

import { createStore, combineReducers } from 'redux'; // 3

import placesReducer from './reducers/places'; // 4

const rootReducer = combineReducers({ // 5
    places: placesReducer // 6
});

const configureStore = () => { // 7
    return createStore(rootReducer); // 8
};

export default configureStore; // 9
```

*back in index.js:*  
10) Import the newly created `configureStore`  
11) Import React  
12) Execute the `configureStore`-function and store it a constant, for example "store".  
13) Create a function which returns the JSX wrapping the `App`-component with the `Provider`-component and store it in a constant, for example "RNRedux"
> The `Provider`-component is a thin wrapper for the `App`-component
14) Pass the "store" to the `store`-prop of the `Provider`-component
15) Pass the wrapper to the `AppRegistry`.
> AppRegistry expects a function which does return another function which returns JSX

```js
import React from 'react'; // 11
...
import configureStore from './src/store/configureStore'; // 10
...

const store = configureStore(); // 12

const RNRedux = () => ( // 13
    <Provider 
        store={store} // 14
    >
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux); // 15
```

### #48 - Creating the Store

#### 2. Connect App.js to React Redux

*in App.js:*  
1) Import `connect` from react-redux
> `connect` is a Higher Order component to connect a component to the Redux Store
2) Refactor the export definition
> The `connect`-function will accept 2 arguments:
3) Create a function which receives the `state` and returns a JS-object where keys are mapped to be accessible as props, and store it in a constant e.g. `mapStateToProps`.  
4) Add the `places`- & `selectedPlace`-key to the object.
> Get them from the global "state" > the property in the reducer "places" > the property this slide of the state holds "places" or "selectedPlace".
5) Import the action creators from the bundled actions file.
6) Create a function which receives the `dispatch` and returns a JS-object where properties are mapped to be used as props in components, and store it in a constant e.g. `mapDispatchToProps`.
7) Add `action`-keys which hold functions which dispatch the action and pass expected arguments.
8) Pass the arguments to connect.
9) Remove local state  
10) In each handler, reach out to the `this.props.[dispatchAction]`-prop and pass the `arguments` it expects.  
11) In the returned JSX, replace `state` with `props`.
```js
...
import { connect } from 'react-redux'; // 1
...
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index'; // 5

class App extends Component { // 2a
// - 9

    placeAddedHandler = placeName => { // 10a
        // this.setState(prevState => {
        //     return {
        //         places: prevState.places.concat({
        //             key: Math.random(),
        //             name: placeName,
        //             image: {
        //                 uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
        //             }
        //         })
        //     };
        // });

        this.props.onAddPlace(placeName);
    };

    placeDeletedHandler = () => { // 10b
        // this.setState(prevState => {
        //   return {
        //     places: prevState.places.filter(place => {
        //       return place.key !== prevState.selectedPlace.key;
        //     }),
        //     selectedPlace: null
        //   }
        // });

        this.props.onDeletePlace();
    };

    modalClosedHandler = () => { // 10c
        // this.setState({
        //     selectedPlace: null
        // })

        this.props.onDeselectPlace();
    };

    placeSelectedHandler = key => { // 10d
        // this.setState(prevState => {
        //     return {
        //         selectedPlace: prevState.places.find(place => {
        //             return place.key === key
        //         })
        //     };
        // });

        this.props.onSelectPlace(key);
    };
    
    render() { // 11
        return (
            ...
            <PlaceDetail 
                selectedPlace={this.props.selectedPlace}
            />
            <PlaceList 
                places={this.props.places}
            />
        )
    };
...
};
...
const mapStateToProps = state => { // 3
    return {
        // 4:
        places: state.places.places, 
        selectedPlace: state.places.selectedPlace 
    };
};
const mapDispatchToProps = dispatch => { // 6
    return {
        // 7:
        onAddPlace: (name) => dispatch(addPlace(name)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace: (key) => dispatch(selectPlace(key)),
        onDeselectPlace: () => dispatch(deselectPlace())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App); // 2b & 8
```

### #51 - Useful Resources & Links

- [What's Redux](https://redux.js.org/docs/introduction/CoreConcepts.html)
- [react-redux](https://github.com/reactjs/react-redux)
---

## Section 4: Debugging React Native Apps

### #53 - Using the Remote JavaScript Debugging console.log

1) Press `Cmd` + `D` to open the options
2) Select the option "Debug JS Remotely" to enable debugging in a Chrome Inspector-window.

### #54 - Debugging with Breakpoints

1) While Debugging Remotely, open the `Sources`-tab of the Inspector.
2) Open any .js-file and set a breakpoint.

### #55 - Debugging+++ with React Native Debugger

1) Download and extract the OS-specific zip from [React Native Debugger](https://github.com/jhen0409/react-native-debugger).

### #56 - Debugging Redux

*in configureStore.js:*
1) Import the `compose`-function from the redux-package.
> `compose` is used to add multiple enhancers, like middleware
2) Add a new `let`-variable, like `composeEnhancers`, enabling it to be reassigned.
3) Assign the imported `compose`-function to it.
4) Check for the special global variable "\_\_DEV\_\_" exposed by React Native, which is only true in development mode
5) If true, connect it to the React Native Dev Tools or fallback to the compose-function.
6) Add the `composeEnhancers`-function to the `createStore`-function.
> Once other middleware need to be added, they need to be passed to the composeEnhancers-function in the returned createStore-function
```js
    import { createStore, combineReducers, compose } from 'redux'; // 1
    ...
    let composeEnhancers = compose; // 2 & 3

    if (__DEV__) { // 4
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIONN_COMPOSE__ || compose; // 5
    }
    ...
    return createStore(rootReducer, composeEnhancers()); // 6
```

### #58 - Useful Resources & Links

- [More about Debugging](https://facebook.github.io/react-native/docs/debugging.html)

---

## Section 5: Linking and Using Third Party Libraries

### #60 - Install Libraries

*E.g*:
Run `npm i react-native-vector-icons -S` to add the library to the project.

### #62 - Linking Libraries on iOS

*In every iOS-project:*
1) Open the `.xcodeproj`-file inside the `ios`-folder of the project.
2) Right-click on the "Libraries" in the left panel and select the option "Add Files to [projectname]".
3) Navigate to installed package-folder inside of the `node_modules`-folder.
4) Select the `.xcodeproj`-file, possibly inside the root or another `ios`-subfolder.
5) Click on the root folder of the project in the left panel.
6) Open the tab "Build Phases" in the right panel.
7) Open the "Link Binary With Libraries"-section.
8) Click on the `+`-icon at the bottom of the list.
9) Search by filtering on a word from the library's name.
10) Select the library and click `Add`.

> Some libraries require additional steps, to be taken from the documentation of that library.

### #63 - Linking Libraries on Android

> Follow the instructions from the documentation of the library.

### #64 - Using Library Features: Adding Icons

Goal: Refactor the 'Delete'-button to use a 'trashbin'-icon.

*in PlaceDetail.js:*
> The `Button`-component can only be used with text.
1) Replace the `Button`-component with a `Touchable`[X]-component.
2) Import the `Icon`-component from react-native-vector-icons/[font] without the extension.
3) Add the `Icon`-tag 
4) Configure the props, taken from the documentation.
5) Wrap in `View`-component
6) Add styling
7) Add functionality
```js
    ...
    import Icon from 'react-native-vector-icons/Ionicons'; // 2
    ...
    <TouchableOpacity // 1
        onPress={props.onItemDeleted} // 7
    >
        <View // 5
            style={styles.deleteButton} // 6
        >
            <Icon // 3
                //4:
                size={30} 
                name="ios-trash" 
                color="red" 
            /> 
        </View>
    </TouchableOpacity>
    ...
```