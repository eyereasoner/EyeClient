# EyeClient is a browser widget for the EYE reasoner.

[**Reasoning**](http://n3.restdesc.org/) is the powerful mechanism to draw conclusions from facts.  
The Semantic Web contains vast amounts of data,
which makes it an interesting source to use with one of several available reasoners.

[**Reasoning in your browser**](https://github.com/RubenVerborgh/EyeClient) is possible with this widget, which brings the [EYE](http://eulersharp.sourceforge.net/) N3 reasoner available to your browser.

[**Bringing reasoning to the Web**](http://reasoning.restdesc.org/) is the initiative with several open source projects (such as this one) that make reasoning accessible.

## See this widget in action.
The [Semantic Web Reasoning With EYE](http://n3.restdesc.org/rules/generalized-rules/) tutorial uses this widget for live examples.

## Use this widget on your own websites.

### How it works
An EYE browser widget communicates with an [EYE reasoner server](https://github.com/RubenVerborgh/EyeServer) to deliver reasoning results.

[![The widget (on the client) and the reasoner (on the server) interact.](http://reasoning.restdesc.org/images/reasoner-client-server.png)](http://reasoning.restdesc.org/)

### Preparation
First, you need to have an [EYE server](https://github.com/RubenVerborgh/EyeServer) running.  
You can set up your own or use the publicly available server at `http://eye.restdesc.org/`.

### Code
You will need [jQuery](http://jquery.com/) and [jQuery UI](http://jqueryui.com/) with the _Tabs_ and _Button_ widgets (included in this project).

Then, you can use the `eye` jQuery plugin.
Starting from an annotated `eye` command:

``` html
<p class="eye">
  <code>eye <span class="data">input.n3</span>
            <span class="data">rules.n3</span>
            --query <span class="query">query.n3</span> --nope</code>
</p>
```

you can initiate the plugin:

``` js
$('.eye').eye({ path: 'http://eye.restdesc.org/' });
```

## Learn more.

The [Bringing reasoning to the Web](http://reasoning.restdesc.org/) page explains the origins of this project and provides pointers to related resources.

This code is written by Ruben Verborgh and serves as a front-end to the [EYE](http://eulersharp.sourceforge.net/) reasoner by Jos De Roo.
