import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BusquedaGeneralComponent } from './components/busqueda-general/busqueda-general.component';
import { BusquedarevComponent } from './components/busquedarev/busquedarev.component';
import { RevistasTableComponent } from './components/revistas-table/revistas-table.component';
import { VistaArtTABComponent } from './components/vista-art-tab/vista-art-tab.component';
import { BusquedaPalClavComponent } from './components/busqueda-pal-clav/busqueda-pal-clav.component';
import { BusquedaPaisComponent } from './components/busqueda-pais/busqueda-pais.component';
import { Component } from '@angular/core';
import { BusquedaPalclavVtabComponent } from './components/busqueda-palclav-vtab/busqueda-palclav-vtab.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { BusquedaRevistaPaisComponent } from './components/busqueda-revista-pais/busqueda-revista-pais.component';






export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'busquedaGeneral', component: BusquedaGeneralComponent },
    { path: 'busquedaGeneral/:palabra', component: BusquedaGeneralComponent },
    { path: 'busquedarev', component: BusquedarevComponent},
    { path: 'busquedarev/:palabra', component: BusquedarevComponent},
    { path: 'revistas-table', component: RevistasTableComponent},
    { path: 'revistas-table/:palabra', component: RevistasTableComponent},
    { path: 'vista-art-tab', component: VistaArtTABComponent},
    { path: 'vista-art-tab/:palabra', component: VistaArtTABComponent},
    { path: 'busqueda-pal-clav', component: BusquedaPalClavComponent},
    { path: 'busqueda-pal-clav/:fuente', component: BusquedaPalClavComponent },
    { path: 'busquedaPais', component: BusquedaPaisComponent },
    { path: 'busquedaPais/:cvePais', component: BusquedaPaisComponent },
    { path: 'busquedaRevistaPais/:cvePais', component: BusquedaRevistaPaisComponent },
    { path: 'PalClav-table/:palabra', component: BusquedaPalclavVtabComponent },
    { path: 'acerca-de', component: AcercaDeComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];