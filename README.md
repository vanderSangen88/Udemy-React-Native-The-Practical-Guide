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

### #46 - Setting Up the Reducer