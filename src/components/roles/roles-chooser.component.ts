
import { Component, OnInit, forwardRef, Input, OnChanges, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Api } from '../../common';

@Component({
    selector: 'roles-chooser',
    templateUrl: 'roles-chooser.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RolesChooserComponent), multi: true },
    ]
})
export class RolesChooserComponent implements ControlValueAccessor, OnChanges {

    private rolesList: any[];
    private stationsList: any[];

    constructor(public api: Api) {

        api.get('/roles')
            .map(r => r.json())
            .subscribe(
                res => { this.rolesList = res.data.filter(r => r.level != 4); },
                e => { logger.warn(e); }
            );

        api.get('/station')
            .map(r => r.json())
            .subscribe(
                res => { this.stationsList = res.data; },
                e => { logger.warn(e); }
            );
        
    }

    getRoleLabel(roleId) {
        return this.rolesList.filter(r => r.id == roleId)[0].name;
    }
    getStationLabel(stationId) {
        return this.stationsList.filter(s => s.id == stationId)[0].name;
    }

    remove(roleId) {
        this.value = [...this.value.filter(r => r.roleId != roleId)];
    }

    @ViewChild('roleValue') roleValue: any;
    @ViewChildren('stationsView') stationsView: QueryList<any>;
    stationValues: any = [];

    addStation(event) {
		event.preventDefault();

        const roleId = this.roleValue.value.id;

        const index = this.value.findIndex(r => r.roleId == roleId);
        if(index > -1) {
            // already existing
            this.value[index].stationIds = this.value[index].stationIds.concat(this.stationValues.map(s => s.id))
                .filter((elem, pos, arr) => {// remove duplicates
                    return arr.indexOf(elem) == pos;
                });

        } else {
            // not existing
            this.value = [...this.value, {
                roleId,
                stationIds: this.stationValues.map(s => s.id),
            }];
        }

        // re-init html components
		this.roleValue.value = null;
        this.stationValues = [];
        this.stationsView.toArray().forEach(s => s.checked = false);
	}

    changeStation(station, $event) {
        if($event.source.checked) {
            this.stationValues = [...this.stationValues, station];
        } else {
            this.stationValues = [...this.stationValues.filter(s => s.id != station.id)];
        }
    }



    propagateChange:any = () => {};

    @Input('value') _value = [];

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.propagateChange(val);
    }

    ngOnChanges(inputs) {}

    writeValue(value) {
        if (value) {
            this.value = value;
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}
}
