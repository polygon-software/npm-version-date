# NPM-Version-Date GitHub Action  

Github action that sets the NPM package version based on a date schema.

[![run npm-version pipeline](https://github.com/polygon-software/npm-version-date/actions/workflows/main.yml/badge.svg)](https://github.com/polygon-software/npm-version-date/actions/workflows/main.yml)

Examples:

| Schema        | Output        | Description  |
| ------------- |:-------------:| ------------:|
| V.yyyy.MM.P | 3.2021.05.1 | Version.Year.Month.Patch |
| V.yyMM.P | 3.2105.1  | Version.YearhMonth.Patch |
| yyyy.MM.P | 2021.05.1 | Year.Month.Patch |
| V.yy.QQ.P | 2021.05.1 | Version.Year.Quarter.Patch |

Each part of the version string (seperated by a dot) can be one of the following:
- V: Major Version Number, passed as input to the github action
- P: Patch Version Number, read from the projects package.json and - optionally - automatically incremented.
- DateFormat: A string that describes a date format.

**Important:** You can not mix V,P and DateFormat. The following examples are invalid schemas:
- VYY.MM.P -> V-and-YY can not occur in the same part and must be seperated by dots. Valid: V.YY.MM.P
- yyyy.MM.VP -> V-and-P can not occur in the same part and must be separated by dots. Valid: yyyy.MM.V.P
- yyyy.MM.V.ddP -> dd-and-P can not occur in the same part and must be separated by dots. Valid: yyyy.MM.V.dd.P

## How to use the NPM-Version-Date GitHub action

An example of workflow

```
name: run npm-version pipeline
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master
        
      - name: 'change version'
        uses: polygon-software/npm-version-date@mater
        with:
          schema: 'V.yyyy.MM.P'
          V: '2'
          git-tag-version: 'false'
```

### Variables

| Variable        | Default           | Example  | Description  |
| ------------- |:-------------:| -----:| -----:|
| schema | - | V.yyyy.MM.P | Date schema based on [date-fns format](https://date-fns.org/v2.21.3/docs/format). |
| V | 1 | - | Major version number. Must only be provided if "V" is used within the schema. |
| increase-patch | false | - | Increment patch verison "P" for the new version string. |


## Date-String formation options:

The Formation options follow the [date-fns format](https://date-fns.org/v2.21.3/docs/format)..

<table>
   <thead>
      <tr>
         <th>Unit</th>
         <th>Pattern</th>
         <th>Result examples</th>
         <th>Notes</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Calendar year</td>
         <td>y</td>
         <td>44, 1, 1900, 2017</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>yy</td>
         <td>44, 01, 00, 17</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>yyy</td>
         <td>044, 001, 1900, 2017</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>yyyy</td>
         <td>0044, 0001, 1900, 2017</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>yyyyy</td>
         <td>...</td>
         <td>3,5</td>
      </tr>
      <tr>
         <td>Local week-numbering year</td>
         <td>Y</td>
         <td>44, 1, 1900, 2017</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>YY</td>
         <td>44, 01, 00, 17</td>
         <td>5,8</td>
      </tr>
      <tr>
         <td></td>
         <td>YYY</td>
         <td>044, 001, 1900, 2017</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>YYYY</td>
         <td>0044, 0001, 1900, 2017</td>
         <td>5,8</td>
      </tr>
      <tr>
         <td></td>
         <td>YYYYY</td>
         <td>...</td>
         <td>3,5</td>
      </tr>
      <tr>
         <td>ISO week-numbering year</td>
         <td>R</td>
         <td>-43, 0, 1, 1900, 2017</td>
         <td>5,7</td>
      </tr>
      <tr>
         <td></td>
         <td>RR</td>
         <td>-43, 00, 01, 1900, 2017</td>
         <td>5,7</td>
      </tr>
      <tr>
         <td></td>
         <td>RRR</td>
         <td>-043, 000, 001, 1900, 2017</td>
         <td>5,7</td>
      </tr>
      <tr>
         <td></td>
         <td>RRRR</td>
         <td>-0043, 0000, 0001, 1900, 2017</td>
         <td>5,7</td>
      </tr>
      <tr>
         <td></td>
         <td>RRRRR</td>
         <td>...</td>
         <td>3,5,7</td>
      </tr>
      <tr>
         <td>Extended year</td>
         <td>u</td>
         <td>-43, 0, 1, 1900, 2017</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>uu</td>
         <td>-43, 01, 1900, 2017</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>uuu</td>
         <td>-043, 001, 1900, 2017</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>uuuu</td>
         <td>-0043, 0001, 1900, 2017</td>
         <td>5</td>
      </tr>
      <tr>
         <td></td>
         <td>uuuuu</td>
         <td>...</td>
         <td>3,5</td>
      </tr>
      <tr>
         <td>Quarter (formatting)</td>
         <td>Q</td>
         <td>1, 2, 3, 4</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>QQQQQ</td>
         <td>1, 2, 3, 4</td>
         <td>4</td>
      </tr>
      <tr>
         <td>Quarter (stand-alone)</td>
         <td>q</td>
         <td>1, 2, 3, 4</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>qq</td>
         <td>01, 02, 03, 04</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>qqqqq</td>
         <td>1, 2, 3, 4</td>
         <td>4</td>
      </tr>
      <tr>
         <td>Month (formatting)</td>
         <td>M</td>
         <td>1, 2, ..., 12</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>MM</td>
         <td>01, 02, ..., 12</td>
         <td></td>
      </tr>
      <tr>
         <td>Month (stand-alone)</td>
         <td>L</td>
         <td>1, 2, ..., 12</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>LL</td>
         <td>01, 02, ..., 12</td>
         <td></td>
      </tr>
      <tr>
         <td>Local week of year</td>
         <td>w</td>
         <td>1, 2, ..., 53</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>ww</td>
         <td>01, 02, ..., 53</td>
         <td></td>
      </tr>
      <tr>
         <td>ISO week of year</td>
         <td>I</td>
         <td>1, 2, ..., 53</td>
         <td>7</td>
      </tr>
      <tr>
         <td></td>
         <td>II</td>
         <td>01, 02, ..., 53</td>
         <td>7</td>
      </tr>
      <tr>
         <td>Day of month</td>
         <td>d</td>
         <td>1, 2, ..., 31</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>dd</td>
         <td>01, 02, ..., 31</td>
         <td></td>
      </tr>
      <tr>
         <td>Day of year</td>
         <td>D</td>
         <td>1, 2, ..., 365, 366</td>
         <td>9</td>
      </tr>
      <tr>
         <td></td>
         <td>DD</td>
         <td>01, 02, ..., 365, 366</td>
         <td>9</td>
      </tr>
      <tr>
         <td></td>
         <td>DDD</td>
         <td>001, 002, ..., 365, 366</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>DDDD</td>
         <td>...</td>
         <td>3</td>
      </tr>
      <tr>
         <td>ISO day of week (formatting)</td>
         <td>i</td>
         <td>1, 2, 3, ..., 7</td>
         <td>7</td>
      </tr>
      <tr>
         <td></td>
         <td>ii</td>
         <td>01, 02, ..., 07</td>
         <td>7</td>
      </tr>
      <tr>
         <td>Local day of week (formatting)</td>
         <td>e</td>
         <td>2, 3, 4, ..., 1</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>ee</td>
         <td>02, 03, ..., 01</td>
         <td></td>
      </tr>
      <tr>
         <td>Local day of week (stand-alone)</td>
         <td>c</td>
         <td>2, 3, 4, ..., 1</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>cc</td>
         <td>02, 03, ..., 01</td>
         <td></td>
      </tr>
      <tr>
         <td>Hour [1-12]</td>
         <td>h</td>
         <td>1, 2, ..., 11, 12</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>hh</td>
         <td>01, 02, ..., 11, 12</td>
         <td></td>
      </tr>
      <tr>
         <td>Hour [0-23]</td>
         <td>H</td>
         <td>0, 1, 2, ..., 23</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>HH</td>
         <td>00, 01, 02, ..., 23</td>
         <td></td>
      </tr>
      <tr>
         <td>Hour [0-11]</td>
         <td>K</td>
         <td>1, 2, ..., 11, 0</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>KK</td>
         <td>01, 02, ..., 11, 00</td>
         <td></td>
      </tr>
      <tr>
         <td>Hour [1-24]</td>
         <td>k</td>
         <td>24, 1, 2, ..., 23</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>kk</td>
         <td>24, 01, 02, ..., 23</td>
         <td></td>
      </tr>
      <tr>
         <td>Minute</td>
         <td>m</td>
         <td>0, 1, ..., 59</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>mm</td>
         <td>00, 01, ..., 59</td>
         <td></td>
      </tr>
      <tr>
         <td>Second</td>
         <td>s</td>
         <td>0, 1, ..., 59</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>ss</td>
         <td>00, 01, ..., 59</td>
         <td></td>
      </tr>
      <tr>
         <td>Fraction of second</td>
         <td>S</td>
         <td>0, 1, ..., 9</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>SS</td>
         <td>00, 01, ..., 99</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>SSS</td>
         <td>000, 001, ..., 999</td>
         <td></td>
      </tr>
      <tr>
         <td></td>
         <td>SSSS</td>
         <td>...</td>
         <td>3</td>
      </tr>
      <tr>
         <td>Seconds timestamp</td>
         <td>t</td>
         <td>512969520</td>
         <td>7</td>
      </tr>
      <tr>
         <td></td>
         <td>tt</td>
         <td>...</td>
         <td>3,7</td>
      </tr>
      <tr>
         <td>Milliseconds timestamp</td>
         <td>T</td>
         <td>512969520900</td>
         <td>7</td>
      </tr>
      <tr>
         <td></td>
         <td>TT</td>
         <td>...</td>
         <td>3,7</td>
      </tr>
   </tbody>
</table>
