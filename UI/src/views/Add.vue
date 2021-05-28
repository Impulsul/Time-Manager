<template>
  <div>
    <md-datepicker v-model="selectedDate" />
    <md-field>
      <label>Nume</label>
      <md-input></md-input>
    </md-field>
    <md-field>
      <label>Description</label>
      <md-input></md-input>
    </md-field>
    <md-field>
      <label>Participants doar atunci cand e activat pe butonul create meetings</label>
      <md-input></md-input>
    </md-field>

    <md-field>
      <label for="movie">Select start hour</label>
      <md-select >
        <md-option value="00">00</md-option>
        <md-option value="01">01</md-option>
        <md-option value="02">02</md-option>
        <md-option value="03">03</md-option>
        <md-option value="04">04</md-option>
        <md-option value="05">05</md-option>
        <md-option value="06">06</md-option>
        <md-option value="07">07</md-option>
        <md-option value="08">08</md-option>
        <md-option value="09">09</md-option>
        <md-option value="10">10</md-option>
        <md-option value="11">11</md-option>
        <md-option value="12">12</md-option>
        <md-option value="13">13</md-option>
        <md-option value="14">14</md-option>
        <md-option value="15">15</md-option>
        <md-option value="16">16</md-option>
        <md-option value="17">17</md-option>
        <md-option value="18">18</md-option>
        <md-option value="19">19</md-option>
        <md-option value="20">20</md-option>
        <md-option value="21">21</md-option>
        <md-option value="22">22</md-option>
        <md-option value="23">23</md-option>
        <md-option value="24">24</md-option>
      </md-select>
      <span class="md-helper-text">Select start hour</span>
    </md-field>
    <!-- <md-field>
        <label for="movie">Select start hour </label>
        <md-input> 
    </md-field> -->

    <md-field>
      <label for="movie">Start minute</label>
      <md-select >
        <md-option value="00">00</md-option>
        <md-option value="01">01</md-option>
        <md-option value="02">02</md-option>
        <md-option value="03">03</md-option>
        <md-option value="04">04</md-option>
        <md-option value="05">05</md-option>
        <md-option value="06">06</md-option>
        <md-option value="07">07</md-option>
        <md-option value="08">08</md-option>
        <md-option value="09">09</md-option>
        <md-option value="10">10</md-option>
        <md-option value="11">11</md-option>
        <md-option value="12">12</md-option>
        <md-option value="13">13</md-option>
        <md-option value="14">14</md-option>
        <md-option value="15">15</md-option>
        <md-option value="16">16</md-option>
        <md-option value="17">17</md-option>
        <md-option value="18">18</md-option>
        <md-option value="19">19</md-option>
        <md-option value="20">20</md-option>
        <md-option value="21">21</md-option>
        <md-option value="22">22</md-option>
        <md-option value="23">23</md-option>
        <md-option value="24">24</md-option>
        <md-option value="25">25</md-option>
        <md-option value="26">26</md-option>
        <md-option value="27">27</md-option>
        <md-option value="28">28</md-option>
        <md-option value="29">29</md-option>
        <md-option value="30">30</md-option>
        <md-option value="31">31</md-option>
        <md-option value="32">32</md-option>
        <md-option value="33">33</md-option>
        <md-option value="34">34</md-option>
        <md-option value="35">35</md-option>
        <md-option value="36">36</md-option>
        <md-option value="37">37</md-option>
        <md-option value="38">38</md-option>
        <md-option value="39">39</md-option>
        <md-option value="40">40</md-option>
        <md-option value="41">41</md-option>
        <md-option value="42">42</md-option>
        <md-option value="43">43</md-option>
        <md-option value="44">44</md-option>
        <md-option value="45">45</md-option>
        <md-option value="46">46</md-option>
        <md-option value="47">47</md-option>
        <md-option value="48">48</md-option>
        <md-option value="49">49</md-option>
        <md-option value="50">50</md-option>
        <md-option value="51">51</md-option>
        <md-option value="52">52</md-option>
        <md-option value="53">53</md-option>
        <md-option value="54">54</md-option>
        <md-option value="55">55</md-option>
        <md-option value="56">56</md-option>
        <md-option value="57">57</md-option>
        <md-option value="58">58</md-option>
        <md-option value="59">59</md-option>
      </md-select>
      <span class="md-helper-text">Select start minute</span>
    </md-field>
    <md-field>
      <label for="movie">Select ending hour</label>
      <md-select >
        <md-option value="00">00</md-option>
        <md-option value="01">01</md-option>
        <md-option value="02">02</md-option>
        <md-option value="03">03</md-option>
        <md-option value="04">04</md-option>
        <md-option value="05">05</md-option>
        <md-option value="06">06</md-option>
        <md-option value="07">07</md-option>
        <md-option value="08">08</md-option>
        <md-option value="09">09</md-option>
        <md-option value="10">10</md-option>
        <md-option value="11">11</md-option>
        <md-option value="12">12</md-option>
        <md-option value="13">13</md-option>
        <md-option value="14">14</md-option>
        <md-option value="15">15</md-option>
        <md-option value="16">16</md-option>
        <md-option value="17">17</md-option>
        <md-option value="18">18</md-option>
        <md-option value="19">19</md-option>
        <md-option value="20">20</md-option>
        <md-option value="21">21</md-option>
        <md-option value="22">22</md-option>
        <md-option value="23">23</md-option>
        <md-option value="24">24</md-option>
      </md-select>
      <span class="md-helper-text">Select ending hour.</span>
    </md-field>
    <!-- <md-field>
        <label for="movie">Select start hour </label>
        <md-input> 
    </md-field> -->

    <md-field>
      <label for="movie">Finish minute</label>
      <md-select >
        <md-option value="00">00</md-option>
        <md-option value="01">01</md-option>
        <md-option value="02">02</md-option>
        <md-option value="03">03</md-option>
        <md-option value="04">04</md-option>
        <md-option value="05">05</md-option>
        <md-option value="06">06</md-option>
        <md-option value="07">07</md-option>
        <md-option value="08">08</md-option>
        <md-option value="09">09</md-option>
        <md-option value="10">10</md-option>
        <md-option value="11">11</md-option>
        <md-option value="12">12</md-option>
        <md-option value="13">13</md-option>
        <md-option value="14">14</md-option>
        <md-option value="15">15</md-option>
        <md-option value="16">16</md-option>
        <md-option value="17">17</md-option>
        <md-option value="18">18</md-option>
        <md-option value="19">19</md-option>
        <md-option value="20">20</md-option>
        <md-option value="21">21</md-option>
        <md-option value="22">22</md-option>
        <md-option value="23">23</md-option>
        <md-option value="24">24</md-option>
        <md-option value="25">25</md-option>
        <md-option value="26">26</md-option>
        <md-option value="27">27</md-option>
        <md-option value="28">28</md-option>
        <md-option value="29">29</md-option>
        <md-option value="30">30</md-option>
        <md-option value="31">31</md-option>
        <md-option value="32">32</md-option>
        <md-option value="33">33</md-option>
        <md-option value="34">34</md-option>
        <md-option value="35">35</md-option>
        <md-option value="36">36</md-option>
        <md-option value="37">37</md-option>
        <md-option value="38">38</md-option>
        <md-option value="39">39</md-option>
        <md-option value="40">40</md-option>
        <md-option value="41">41</md-option>
        <md-option value="42">42</md-option>
        <md-option value="43">43</md-option>
        <md-option value="44">44</md-option>
        <md-option value="45">45</md-option>
        <md-option value="46">46</md-option>
        <md-option value="47">47</md-option>
        <md-option value="48">48</md-option>
        <md-option value="49">49</md-option>
        <md-option value="50">50</md-option>
        <md-option value="51">51</md-option>
        <md-option value="52">52</md-option>
        <md-option value="53">53</md-option>
        <md-option value="54">54</md-option>
        <md-option value="55">55</md-option>
        <md-option value="56">56</md-option>
        <md-option value="57">57</md-option>
        <md-option value="58">58</md-option>
        <md-option value="59">59</md-option>
      </md-select>
      <span class="md-helper-text">Select ending minute</span>
    </md-field>
    <md-button class="md-raised md-primary">Add task doar la task</md-button>
    <md-button class="md-raised md-primary">Create meeting doar la meeting</md-button>

    <div class="phone-viewport">
      <md-bottom-bar md-sync-route>
        <md-bottom-bar-item
          to="/"
          exact
          md-label="List"
          md-icon="list"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          to="/add"
          md-label="Add"
          md-icon="add"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          to="/add"
          md-label="Create meeting"
          md-icon="group"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          md-label="Remove"
          md-icon="delete"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          to="/auth"
          md-label="Log out"
          md-icon="home"
        ></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicDatepicker",
  data: () => ({
    selectedDate: null,
    form: {
      hour: null,
    },
  }),
  computed: {

  },
};
</script>

<style >
.phone-viewport {
  overflow: hidden;
  border: 1px solid rgba(#000, 0.26);
  background: rgba(#000, 0.06);
}

.md-datepicker {
  margin-top: 1%;
  margin-right: 5%;
}

.md-button {
  margin-left: 50%;
  margin-top: 2%;
}
</style>
