'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ng-inputs-material documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ButtonLoadingDirectivesModule.html" data-type="entity-link" >ButtonLoadingDirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ButtonLoadingDirectivesModule-56bcdaabf66e2e9793932cbb9f7d6017"' : 'data-target="#xs-directives-links-module-ButtonLoadingDirectivesModule-56bcdaabf66e2e9793932cbb9f7d6017"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ButtonLoadingDirectivesModule-56bcdaabf66e2e9793932cbb9f7d6017"' :
                                        'id="xs-directives-links-module-ButtonLoadingDirectivesModule-56bcdaabf66e2e9793932cbb9f7d6017"' }>
                                        <li class="link">
                                            <a href="directives/ButtonLoadingDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonLoadingDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColumnsDirectivesModule.html" data-type="entity-link" >ColumnsDirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ColumnsDirectivesModule-8579c9344d7d24e10e5d115fc4c753f5"' : 'data-target="#xs-directives-links-module-ColumnsDirectivesModule-8579c9344d7d24e10e5d115fc4c753f5"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ColumnsDirectivesModule-8579c9344d7d24e10e5d115fc4c753f5"' :
                                        'id="xs-directives-links-module-ColumnsDirectivesModule-8579c9344d7d24e10e5d115fc4c753f5"' }>
                                        <li class="link">
                                            <a href="directives/ColumnsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColumnsDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContenteditableModule.html" data-type="entity-link" >ContenteditableModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ContenteditableModule-cf730f5a07f78bbb3299530bdb1bc466"' : 'data-target="#xs-directives-links-module-ContenteditableModule-cf730f5a07f78bbb3299530bdb1bc466"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ContenteditableModule-cf730f5a07f78bbb3299530bdb1bc466"' :
                                        'id="xs-directives-links-module-ContenteditableModule-cf730f5a07f78bbb3299530bdb1bc466"' }>
                                        <li class="link">
                                            <a href="directives/ContenteditableControlAccessor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContenteditableControlAccessor</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExpandDirectivesModule.html" data-type="entity-link" >ExpandDirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ExpandDirectivesModule-df205ded1189576f36feac04e1ea818c"' : 'data-target="#xs-directives-links-module-ExpandDirectivesModule-df205ded1189576f36feac04e1ea818c"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ExpandDirectivesModule-df205ded1189576f36feac04e1ea818c"' :
                                        'id="xs-directives-links-module-ExpandDirectivesModule-df205ded1189576f36feac04e1ea818c"' }>
                                        <li class="link">
                                            <a href="directives/ExpandDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpandDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileControlDirectivesModule.html" data-type="entity-link" >FileControlDirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-FileControlDirectivesModule-78339728325937ffaf8927ed3e005c22"' : 'data-target="#xs-directives-links-module-FileControlDirectivesModule-78339728325937ffaf8927ed3e005c22"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-FileControlDirectivesModule-78339728325937ffaf8927ed3e005c22"' :
                                        'id="xs-directives-links-module-FileControlDirectivesModule-78339728325937ffaf8927ed3e005c22"' }>
                                        <li class="link">
                                            <a href="directives/FileControlAccessor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileControlAccessor</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GuardModule.html" data-type="entity-link" >GuardModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HttpModule.html" data-type="entity-link" >HttpModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HttpModule-6caf04f69f84e8fbe02c94dcba13a3ef"' : 'data-target="#xs-injectables-links-module-HttpModule-6caf04f69f84e8fbe02c94dcba13a3ef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HttpModule-6caf04f69f84e8fbe02c94dcba13a3ef"' :
                                        'id="xs-injectables-links-module-HttpModule-6caf04f69f84e8fbe02c94dcba13a3ef"' }>
                                        <li class="link">
                                            <a href="injectables/AuthJwtService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthJwtService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HttpService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InteractionDirectivesModule.html" data-type="entity-link" >InteractionDirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-InteractionDirectivesModule-c1504a72d01eb633ddf3d8a8641fe683"' : 'data-target="#xs-directives-links-module-InteractionDirectivesModule-c1504a72d01eb633ddf3d8a8641fe683"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-InteractionDirectivesModule-c1504a72d01eb633ddf3d8a8641fe683"' :
                                        'id="xs-directives-links-module-InteractionDirectivesModule-c1504a72d01eb633ddf3d8a8641fe683"' }>
                                        <li class="link">
                                            <a href="directives/InteractionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InteractionDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaskedDirectivesModule.html" data-type="entity-link" >MaskedDirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-MaskedDirectivesModule-183e9c6962ea1ae06518aa7553167a7b"' : 'data-target="#xs-directives-links-module-MaskedDirectivesModule-183e9c6962ea1ae06518aa7553167a7b"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-MaskedDirectivesModule-183e9c6962ea1ae06518aa7553167a7b"' :
                                        'id="xs-directives-links-module-MaskedDirectivesModule-183e9c6962ea1ae06518aa7553167a7b"' }>
                                        <li class="link">
                                            <a href="directives/MaskedDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaskedDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgForInModule.html" data-type="entity-link" >NgForInModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NgForInModule-4f54c9c1f97ef3aa8a32ccf6f7e46916"' : 'data-target="#xs-directives-links-module-NgForInModule-4f54c9c1f97ef3aa8a32ccf6f7e46916"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NgForInModule-4f54c9c1f97ef3aa8a32ccf6f7e46916"' :
                                        'id="xs-directives-links-module-NgForInModule-4f54c9c1f97ef3aa8a32ccf6f7e46916"' }>
                                        <li class="link">
                                            <a href="directives/NgForIn.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NgForIn</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgTranslateModule.html" data-type="entity-link" >NgTranslateModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NgTranslateModule-6de4d7c6e089e6156f3c92a6620db674"' : 'data-target="#xs-injectables-links-module-NgTranslateModule-6de4d7c6e089e6156f3c92a6620db674"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NgTranslateModule-6de4d7c6e089e6156f3c92a6620db674"' :
                                        'id="xs-injectables-links-module-NgTranslateModule-6de4d7c6e089e6156f3c92a6620db674"' }>
                                        <li class="link">
                                            <a href="injectables/NgTranslateService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NgTranslateService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link" >PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-3f291520fe7ddd242195a22800f48529"' : 'data-target="#xs-pipes-links-module-PipesModule-3f291520fe7ddd242195a22800f48529"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-3f291520fe7ddd242195a22800f48529"' :
                                            'id="xs-pipes-links-module-PipesModule-3f291520fe7ddd242195a22800f48529"' }>
                                            <li class="link">
                                                <a href="pipes/ElsePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ElsePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/IfElsePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IfElsePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MaskedPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaskedPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/RelativeTimePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RelativeTimePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SanitizerHtmlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SanitizerHtmlPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SanitizerScriptPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SanitizerScriptPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SanitizerStylePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SanitizerStylePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SanitizerUrlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SanitizerUrlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResizeDirectivesModule.html" data-type="entity-link" >ResizeDirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ResizeDirectivesModule-78eebfe34922ee5007ad2dc600f5e99e"' : 'data-target="#xs-directives-links-module-ResizeDirectivesModule-78eebfe34922ee5007ad2dc600f5e99e"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ResizeDirectivesModule-78eebfe34922ee5007ad2dc600f5e99e"' :
                                        'id="xs-directives-links-module-ResizeDirectivesModule-78eebfe34922ee5007ad2dc600f5e99e"' }>
                                        <li class="link">
                                            <a href="directives/ResizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResizeDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RouteChangeModule.html" data-type="entity-link" >RouteChangeModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RouteChangeModule-d54b06ece6abaaf443a27a9b40525675"' : 'data-target="#xs-injectables-links-module-RouteChangeModule-d54b06ece6abaaf443a27a9b40525675"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RouteChangeModule-d54b06ece6abaaf443a27a9b40525675"' :
                                        'id="xs-injectables-links-module-RouteChangeModule-d54b06ece6abaaf443a27a9b40525675"' }>
                                        <li class="link">
                                            <a href="injectables/RouteChangeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouteChangeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScreenPointsModule.html" data-type="entity-link" >ScreenPointsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ScreenPointsModule-d8ded90d8435bb82838f9851cff58223"' : 'data-target="#xs-injectables-links-module-ScreenPointsModule-d8ded90d8435bb82838f9851cff58223"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ScreenPointsModule-d8ded90d8435bb82838f9851cff58223"' :
                                        'id="xs-injectables-links-module-ScreenPointsModule-d8ded90d8435bb82838f9851cff58223"' }>
                                        <li class="link">
                                            <a href="injectables/ScreenPointsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScreenPointsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatesModule.html" data-type="entity-link" >TemplatesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TemplatesModule-deba43b009ae4c921116da785189f1d7"' : 'data-target="#xs-components-links-module-TemplatesModule-deba43b009ae4c921116da785189f1d7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatesModule-deba43b009ae4c921116da785189f1d7"' :
                                            'id="xs-components-links-module-TemplatesModule-deba43b009ae4c921116da785189f1d7"' }>
                                            <li class="link">
                                                <a href="components/FormTemplate.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormTemplate</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TemplatesModule-deba43b009ae4c921116da785189f1d7"' : 'data-target="#xs-injectables-links-module-TemplatesModule-deba43b009ae4c921116da785189f1d7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatesModule-deba43b009ae4c921116da785189f1d7"' :
                                        'id="xs-injectables-links-module-TemplatesModule-deba43b009ae4c921116da785189f1d7"' }>
                                        <li class="link">
                                            <a href="injectables/NavigatorTemplateService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigatorTemplateService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RequestTemplateService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestTemplateService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CommonValidation.html" data-type="entity-link" >CommonValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateValidation.html" data-type="entity-link" >DateValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocsValidation.html" data-type="entity-link" >DocsValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileValidation.html" data-type="entity-link" >FileValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/NumberValidation.html" data-type="entity-link" >NumberValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObjectValidation.html" data-type="entity-link" >ObjectValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatternValidation.html" data-type="entity-link" >PatternValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/StringValidation.html" data-type="entity-link" >StringValidation</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthJwtInterceptor.html" data-type="entity-link" >AuthJwtInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/DialogGuard.html" data-type="entity-link" >DialogGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoggedGuard.html" data-type="entity-link" >LoggedGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TitleGuard.html" data-type="entity-link" >TitleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IColumnsConfig.html" data-type="entity-link" >IColumnsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConfigRequestTemplate.html" data-type="entity-link" >IConfigRequestTemplate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFormTemplate.html" data-type="entity-link" >IFormTemplate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFormTemplateConfig.html" data-type="entity-link" >IFormTemplateConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INavigatorTemplate.html" data-type="entity-link" >INavigatorTemplate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INgUtilsConfig.html" data-type="entity-link" >INgUtilsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRequestTemplate.html" data-type="entity-link" >IRequestTemplate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgForInChanges.html" data-type="entity-link" >NgForInChanges</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});