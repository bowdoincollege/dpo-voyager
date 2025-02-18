/**
 * 3D Foundation Project
 * Copyright 2019 Smithsonian Institution
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Document, { IDocumentDisposeEvent, IDocumentUpdateEvent } from "@ff/core/Document";

import { IAnnotation as IAnnotationJSON } from "client/schema/model";

////////////////////////////////////////////////////////////////////////////////

export type Vector3 = number[];
export enum EAnnotationStyle { Standard, Extended, Balloon, Pin }

export type IAnnotationUpdateEvent = IDocumentUpdateEvent<Annotation>;
export type IAnnotationDisposeEvent = IDocumentDisposeEvent<Annotation>;

// @ts-ignore: change property type from string to enum
export interface IAnnotation extends IAnnotationJSON
{
    style: EAnnotationStyle;
}


export default class Annotation extends Document<IAnnotation, IAnnotationJSON>
{
    static readonly defaultColor = [ 0, 0.61, 0.87 ];

    static fromJSON(json: IAnnotationJSON)
    {
        return new Annotation(json);
    }

    protected init(): IAnnotation
    {
        return {
            id: this.generateId(),
            title: "New Annotation",
            lead: "",
            tags: [],
            articleId: "",
            imageUri: "",

            style: EAnnotationStyle.Standard,
            visible: true,
            expanded: false,

            position: null,
            direction: null,
            scale: 1,
            offset: 0,
            tilt: 0,
            azimuth: 0,

            color: [ 0, 0.61, 0.87 ],

            zoneIndex: -1,
        };
    }

    protected deflate(data: IAnnotation, json: IAnnotationJSON)
    {
        json.id = data.id;

        if (data.title) {
            json.title = data.title;
        }
        if (data.lead) {
            json.lead = data.lead;
        }
        if (data.tags.length > 0) {
            json.tags = data.tags;
        }
        if (data.articleId) {
            json.articleId = data.articleId;
        }
        if (data.imageUri) {
            json.imageUri = data.imageUri;
        }
        if (data.style !== EAnnotationStyle.Standard) {
            json.style = EAnnotationStyle[data.style];
        }
        if (data.visible === false) {
            json.visible = data.visible;
        }
        // TODO: Decide whether to serialize
        // if (data.expanded) {
        //     json.expanded = data.expanded;
        // }
        if (data.position) {
            json.position = data.position.slice();
        }
        if (data.direction) {
            json.direction = data.direction.slice();
        }
        if (data.scale !== 1) {
            json.scale = data.scale;
        }
        if (data.offset !== 0) {
            json.offset = data.offset;
        }
        if (data.tilt !== 0) {
            json.tilt = data.tilt;
        }
        if (data.azimuth !== 0) {
            json.azimuth = data.azimuth;
        }

        const color = data.color;
        if (color && (color[0] !== 1 || color[1] !== 1 || color[2] !== 1)) {
            json.color = color.slice();
        }

        if (data.zoneIndex > -1) {
            json.zoneIndex = data.zoneIndex;
        }

        return data as IAnnotation;
    }

    protected inflate(json: IAnnotationJSON, data: IAnnotation)
    {
        data.id = json.id;

        data.title = json.title || "";
        data.lead = json.lead || "";
        data.tags = json.tags || [];

        data.articleId = json.articleId || "";
        data.imageUri = json.imageUri || "";

        data.style = EAnnotationStyle[json.style] || EAnnotationStyle.Standard;
        data.visible = json.visible !== undefined ? json.visible : true;
        data.expanded = json.expanded || false;

        data.position = json.position.slice();
        data.direction = json.direction.slice();
        data.scale = json.scale !== undefined ? json.scale : 1;
        data.offset = json.offset || 0;
        data.tilt = json.tilt || 0;
        data.azimuth = json.azimuth || 0;

        data.color = json.color || Annotation.defaultColor.slice();

        data.zoneIndex = json.zoneIndex !== undefined ? json.zoneIndex : -1;
    }
}