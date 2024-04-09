<!--
 * @Author: 胖胖很瘦
 * @Date: 2024-03-03 15:47:10
 * @LastEditors: 胖胖很瘦
 * @LastEditTime: 2024-04-09 17:19:57
-->
<script setup lang="ts">
import { stringify as stringifyToml } from 'iarna-toml-esm';
import JSON5 from 'json5';
import { withDefaultOnError } from '../../utils/defaults';
import type { UseValidationRule } from '@/composable/validation';
import * as curlconverter from 'curlconverter';
import { isNotThrowing } from '@/utils/boolean';

const languages = {
  "Ansible": curlconverter.toAnsibleWarn,
  // "C": curlconverter.toCFMLWarn,
  "ColdFusion": curlconverter.toCFMLWarn,
  "Clojure": curlconverter.toClojureWarn,
  "C#": curlconverter.toCSharpWarn,
  "Dart": curlconverter.toDartWarn,
  "Elixir": curlconverter.toElixirWarn,
  "Go": curlconverter.toGoWarn,
  "HAR": curlconverter.toHarStringWarn,
  "HTTP": curlconverter.toHTTPWarn,
  "HTTPie": curlconverter.toHttpieWarn,
  "Java-HttpClient": curlconverter.toJavaWarn,
  "Java-HttpURLConnection": curlconverter.toJavaHttpUrlConnectionWarn,
  "Java-jsoup": curlconverter.toJavaJsoupWarn,
  "Java-OkHttp": curlconverter.toJavaOkHttpWarn,
  // "Java-fetch": curlconverter.toJavaScriptWarn,
  "Java-jQuery": curlconverter.toJavaScriptJqueryWarn,
  "Java-XHR": curlconverter.toJavaScriptXHRWarn,
  "JSON": curlconverter.toJsonStringWarn,
  "Julia": curlconverter.toJuliaWarn,
  "Kotlin": curlconverter.toKotlinWarn,
  "Lua": curlconverter.toLuaWarn,
  "MATLAB": curlconverter.toMATLABWarn,
  "Node-fetch": curlconverter.toNodeFetchWarn,
  "Node-Axios": curlconverter.toNodeAxiosWarn,
  "Node-Got": curlconverter.toNodeGotWarn,
  "Node-http": curlconverter.toNodeHttpWarn,
  "Node-Ky": curlconverter.toNodeKyWarn,
  "Node-SuperAgent": curlconverter.toNodeSuperAgentWarn,
  "Node-request": curlconverter.toNodeRequestWarn,
  "Objective-C": curlconverter.toObjectiveCWarn,
  "OCaml": curlconverter.toOCamlWarn,
  "Perl": curlconverter.toPerlWarn,
  "PHP-cURL": curlconverter.toPhpWarn,
  "PHP-Guzzle": curlconverter.toPhpGuzzleWarn,
  "PHP-Requests": curlconverter.toPhpRequestsWarn,
  "PowerShell-Invoke-RestMethod": curlconverter.toPowershellRestMethodWarn,
  "PowerShell-Invoke-WebRequest": curlconverter.toPowershellWebRequestWarn,
  "Python-Requests": curlconverter.toPythonWarn,
  "Python-http.client": curlconverter.toPythonHttpWarn,
  "R": curlconverter.toRWarn,
  "Ruby": curlconverter.toRubyWarn,
  "Rust": curlconverter.toRustWarn,
  "Swift": curlconverter.toSwiftWarn,
  "Wget": curlconverter.toWgetWarn,
  "Browser": curlconverter.toBrowserWarn
}

const language = ref<keyof typeof languages>('Ansible');

// const examples = {
//   "auth": 'curl "https://example.com/" -u "some_username:some_password"',
//   "get": 'curl "https://example.com/" -u "some_username:some_password" -get'
// }

// const example = ref<keyof typeof examples>('');

var curlCommand = ref('');

// var codeResult = ""

const codeResult = computed(() =>
  convertCurlToCode(languages[language.value], curlCommand.value),
);

const convertCurlToCode = (l: string, c: string) => {
  if(c === ""){
    return ""
  }
  try {
    var [generatedCode, warnings] = l(c)
    return generatedCode
  } catch (error) {
    return ""
  }
}

function onChangeLanguage(params:type) {
  console.log("language changed to: " + params)
  console.log(params)

  if(curlCommand !== ""){
    convertCurlToCode(languages[language.value], curlCommand.value)
  }
}


function validCurl(value: string): boolean {
  try {
    curlconverter.toPythonWarn(value)
    return true
  } catch (error) {
    console.log("nonono")
    return false
  }
}

const curlValidationRules = [
  {
    validator: (value: string) => value === '' || validCurl(value),
    message: 'Invalid CURL format',
  },
];

</script>

<template>
  <div style="width: 80%">
    <c-card>
      <c-select
        v-model:value="language"
        searchable
        label="Language:"
        :options="Object.keys(languages)"
      />
      <n-divider />

      <!-- <c-select
        v-model:value="example"
        searchable
        label="Examples:"
        :options="Object.keys(examples)"
        @click="onChangeExample"
      /> -->
      <c-input-text
        v-model:value="curlCommand"
        :validation-rules="curlValidationRules"
        multiline 
        raw-text
        placeholder="Your Curl command..." 
        rows="10" 
        label="Curl command:" 
        
      />

      <h3>{{language}}: Code</h3>
      <TextareaCopyable v-model:value="codeResult" />
    </c-card>
  </div>

</template>
