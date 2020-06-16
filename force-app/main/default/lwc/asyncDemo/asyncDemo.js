import { LightningElement, wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import libOne from '@salesforce/resourceUrl/libOne';
import libTwo from '@salesforce/resourceUrl/libTwo';
import libThree from '@salesforce/resourceUrl/libThree';
import styleLib from '@salesforce/resourceUrl/styleLib';
import getData from '@salesforce/apex/SampleController.getData';

export default class AsyncDemo extends LightningElement {
    data;
    libsLoaded = false;
    dataLoaded = false;

    @wire(getData, {})
    getData({ data, error }) {
        if (data) {
            this.data = data;
            this.dataLoaded = true;
            console.log('Data loaded');
            // Try to init component
            this.initComponent();
        } else if (error) {
            // Handle error
        }
    }

    async connectedCallback() {
        // Non blocking async call to load stylesheet
        loadStyle(this, styleLib);
        // Wait for all scripts to load in parallel
        await Promise.all([
            loadScript(this, libOne),
            loadScript(this, libTwo),
            loadScript(this, libThree)
        ]);
        this.libsLoaded = true;
        // Try to init component
        this.initComponent();
    }

    initComponent() {
        // Only init component when libs AND data are both loaded
        if (this.libsLoaded && this.dataLoaded) {
            // Init component
            console.log('Component ready');
        }
    }
}

