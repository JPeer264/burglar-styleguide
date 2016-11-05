# Burglar Styleguide

> The styleguide is published on [JPeer.at](https://projects.jpeer.at/burglar-styleguide)

## Contents

- [Usage](#usage)
- [Styleguide](#styleguide)

## Usage

> you must have installed Node v0.12+

Make sure you have instlled Grunt globally

```sh
npm i -g grunt-cli
```

Install the dependencies

```sh
npm i
```

### Build

**Dev**

Build the developing code. The builded files are stored in `tmp`

```sh
grunt build:dev
```

**Production**

Build the production ready code. The builded files are stored in `dist`

```sh
grunt build:prod
```

or

```sh
grunt
```

### Live Developing

For developing with live reloading in a browser use:

```sh
grunt serve:dev
```

## Styleguide

- [Brand Guide](#brand-guide)
- [CSS Methodology](#css-methodology)
- [Component Library](#component-library)

### Brand Guide

- [Colors](#colors)
- [Logo](#logo)
- [Typography](#typography)

#### Colors
- Green: #457355
- Beige: #D7D9CC
- Brown: #8C715A
- Orange: #A65644
- Red: #401915

#### Logo
- Large Logo
- Medium Logo
- Small Logo

#### Typography
##### Font Family
- Heading: Abril Fatface
- Body: Open Sans Condensed
- First letter Capital?

##### Font Size
[Augmented Fourth Scale](http://type-scale.com/)

#### Icons
Fontawesome

### CSS Methodology

- [Code style rules (airbnb)](#code-style-rules)
- [File structure](#file-structure)
- [Preprocessor](#preprocessor)
- [Naming Conventions](#naming-convetions)

#### Code Style Rules
[Airbnb Styleguide](https://github.com/airbnb/css) should be followed

#### File Structure

#### Preprocessor/ Build Pipeline

#### Naming Conventions



### Component Library

- [Headings](#headings)
- [Form elements](#form-elements)
- [Links](#links)
- [Buttons](#buttons)
- etc.
