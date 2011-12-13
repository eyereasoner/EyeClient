#JavaScript client for EYE

[EYE](http://eulersharp.sourceforge.net/) is a powerful N3 reasoner.  
This JavaScript client makes EYE available in your browser.

## Example
A live version of this plugin can be seen in the [Semantic Web Reasoning With EYE](http://n3.restdesc.org/rules/generalized-rules/) tutorial.

## Usage
First, you need to have an [EYE server](https://github.com/RubenVerborgh/EyeServer) running.  
A public server is available at `http://eye.restdesc.org/`.

Then, you can use the `eye` jQuery plugin.
Starting from an annotated eye command:

    <p class="eye">
      <code>eye <span class="data">input.n3</span>
                <span class="data">rules.n3</span>
                --query <span class="query">query.n3</span> --nope</code>
    </p>

you can initiate the plugin:

    $('.eye').eye({ path: 'http://eye.restdesc.org/' });
