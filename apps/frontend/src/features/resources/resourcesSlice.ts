import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDocument, ICategory, IFacultie } from "../../interfaces/IResources";

interface ResourcesState {
    categories: Array<ICategory>;
    documents: Array<IDocument>;
    faculties: Array<IFacultie>;
}

const initialState: ResourcesState = {
    categories: [],
    documents: [],
    faculties: [],
};

const resourcesSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        setCategories: (
            state,
            { payload }: PayloadAction<Array<ICategory>>
        ): ResourcesState => ({ ...state, categories: payload }),
        setDocuments: (
            state,
            { payload }: PayloadAction<Array<IDocument>>
        ): ResourcesState => ({ ...state, documents: payload }),
        setFaculties: (
            state,
            { payload }: PayloadAction<Array<IFacultie>>
        ): ResourcesState => ({ ...state, faculties: payload }),
    },
});

export const { setCategories, setDocuments, setFaculties } =
    resourcesSlice.actions;

export default resourcesSlice.reducer;
