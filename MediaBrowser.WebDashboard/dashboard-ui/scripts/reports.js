﻿(function ($, document, window) {

    var defaultSortBy = "SortName";

    // The base query options
    var query = {

        SortBy: defaultSortBy,
        SortOrder: "Ascending",
        Recursive: true,
        Fields: "MediaSources,DateCreated,Settings,Studios",
        StartIndex: 0,
        IncludeItemTypes: "Movie",
        IsMissing: false,
        IsVirtualUnaired: false,
        Limit: 200,
        CollapseBoxSetItems: false
    };

    function getHeaderCells(reportType) {

        switch (reportType) {

            case 'Season':
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderSeries'), sortField: 'SeriesSortName,SortName', type: 'Series' },
                        { name: Globalize.translate('HeaderSeason'), sortField: 'SortName', type: 'Season' },
                        { name: Globalize.translate('HeaderSeasonNumber'), type: 'Season Number', sortField: 'IndexNumber' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' }
                    ];
                }
            case 'Series':
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderName'), sortField: 'SortName', type: 'Name' },
                        { name: Globalize.translate('HeaderNetwork'), sortField: 'Studio,SortName', type: 'Network' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' },
                        { name: Globalize.translate('HeaderYear'), sortField: 'ProductionYear,PremiereDate,SortName', type: 'Year' },
                        { name: Globalize.translate('HeaderParentalRating'), sortField: 'OfficialRating,SortName', type: 'Parental Rating' },
                        { name: Globalize.translate('HeaderCommunityRating'), sortField: 'CommunityRating,SortName', type: 'Community Rating' },
                        { name: Globalize.translate('HeaderRuntime'), sortField: 'Runtime,SortName', type: 'Runtime' },
                        { name: Globalize.translate('HeaderTrailers'), type: 'Trailers' },
                        { name: Globalize.translate('HeaderSpecials'), type: 'Specials' }
                    ];
                }
            case 'Game':
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderName'), sortField: 'SortName', type: 'Name' },
                        { name: Globalize.translate('HeaderGameSystem'), sortField: 'GameSystem,SortName', type: 'Game System' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' },
                        { name: Globalize.translate('HeaderReleaseDate'), sortField: 'ProductionYear,PremiereDate,GameSystem,SortName', type: 'Release Date' },
                        { name: Globalize.translate('HeaderParentalRating'), sortField: 'OfficialRating,SortName', type: 'Parental Rating' },
                        { name: Globalize.translate('HeaderCommunityRating'), sortField: 'CommunityRating,SortName', type: 'Community Rating' },
                        { name: Globalize.translate('HeaderPlayers'), type: 'Players', sortField: 'Players,GameSystem,SortName' },
                        { name: Globalize.translate('HeaderTrailers'), type: 'Trailers' }
                    ];
                }
            case 'Audio':
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderAlbumArtist'), sortField: 'AlbumArtist,Album,SortName', type: 'Album Artist' },
                        { name: Globalize.translate('HeaderAlbum'), type: 'Album', sortField: 'Album,SortName' },
                        { name: Globalize.translate('HeaderDisc'), type: 'Disc' },
                        { name: Globalize.translate('HeaderTrack'), type: 'Track' },
                        { name: Globalize.translate('HeaderName'), sortField: 'SortName', type: 'Name' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' },
                        { name: Globalize.translate('HeaderReleaseDate'), sortField: 'ProductionYear,PremiereDate,SortName', type: 'Release Date' },
                        { name: Globalize.translate('HeaderRuntime'), sortField: 'Runtime,SortName', type: 'Runtime' },
                        { name: Globalize.translate('HeaderAudio'), type: 'Audio' },
                        { name: Globalize.translate('HeaderEmbeddedImage'), type: 'Embedded Image' }
                    ];
                }
            case 'Episode':
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderSeries'), sortField: 'SeriesSortName,SortName', type: 'Series' },
                        { name: Globalize.translate('HeaderSeason') },
                        { name: Globalize.translate('HeaderName'), sortField: 'SortName', type: 'Name' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' },
                        { name: Globalize.translate('HeaderReleaseDate'), sortField: 'ProductionYear,PremiereDate,SortName', type: 'Release Date' },
                        { name: Globalize.translate('HeaderCommunityRating'), sortField: 'CommunityRating,SortName', type: 'Community Rating' },
                        { name: Globalize.translate('HeaderRuntime'), sortField: 'Runtime,SortName', type: 'Runtime' },
                        { name: Globalize.translate('HeaderVideo'), type: 'Video' },
                        { name: Globalize.translate('HeaderResolution'), type: 'Resolution' },
                        { name: Globalize.translate('HeaderAudio'), type: 'Audio' },
                        { name: Globalize.translate('HeaderSubtitles'), type: 'Subtitles' }
                    ];
                }
            case 'BoxSet':
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderName'), sortField: 'SortName', type: 'Name' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' },
                        { name: Globalize.translate('HeaderReleaseDate'), sortField: 'ProductionYear,PremiereDate,SortName', type: 'Release Date' },
                        { name: Globalize.translate('HeaderParentalRating'), sortField: 'OfficialRating,SortName', type: 'Parental Rating' },
                        { name: Globalize.translate('HeaderCommunityRating'), sortField: 'CommunityRating,SortName', type: 'Community Rating' },
                        { name: Globalize.translate('HeaderTrailers'), type: 'Trailers' }
                    ];
                }
            case 'Book':
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderSeries'), type: 'Series' },
                        { name: Globalize.translate('HeaderName'), sortField: 'SortName', type: 'Name' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' },
                        { name: Globalize.translate('HeaderReleaseDate'), sortField: 'ProductionYear,PremiereDate,SortName', type: 'Release Date' },
                        { name: Globalize.translate('HeaderParentalRating'), sortField: 'OfficialRating,SortName', type: 'Parental Rating' },
                        { name: Globalize.translate('HeaderCommunityRating'), sortField: 'CommunityRating,SortName', type: 'Community Rating' }
                    ];
                }
            case 'MusicArtist':
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderName'), sortField: 'SortName', type: 'Name' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' }
                    ];
                }
            case 'MusicAlbum':
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderAlbumArtist'), sortField: 'AlbumArtist,SortName', type: 'Album Artist' },
                        { name: Globalize.translate('HeaderName'), sortField: 'SortName', type: 'Name' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' },
                        { name: Globalize.translate('HeaderReleaseDate'), sortField: 'ProductionYear,PremiereDate,SortName', type: 'Release Date' },
                        { name: Globalize.translate('HeaderParentalRating'), sortField: 'OfficialRating,SortName', type: 'Parental Rating' },
                        { name: Globalize.translate('HeaderCommunityRating'), sortField: 'CommunityRating,SortName', type: 'Community Rating' },
                        { name: Globalize.translate('HeaderRuntime'), sortField: 'Runtime,SortName', type: 'Runtime' }
                    ];
                }
            default:
                {
                    return [
                        {},
                        { name: Globalize.translate('HeaderName'), sortField: 'SortName', type: 'Name' },
                        { name: Globalize.translate('HeaderDateAdded'), sortField: 'DateCreated,SortName', type: 'Date Added' },
                        { name: Globalize.translate('HeaderReleaseDate'), sortField: 'ProductionYear,PremiereDate,SortName', type: 'Release Date' },
                        { name: Globalize.translate('HeaderParentalRating'), sortField: 'OfficialRating,SortName', type: 'Parental Rating' },
                        { name: Globalize.translate('HeaderCommunityRating'), sortField: 'CommunityRating,SortName', type: 'Community Rating' },
                        { name: Globalize.translate('HeaderRuntime'), sortField: 'Runtime,SortName', type: 'Runtime' },
                        { name: Globalize.translate('HeaderVideo'), type: 'Video' },
                        { name: Globalize.translate('HeaderResolution'), type: 'Resolution' },
                        { name: Globalize.translate('HeaderAudio'), type: 'Audio' },
                        { name: Globalize.translate('HeaderSubtitles'), type: 'Subtitles' },
                        { name: Globalize.translate('HeaderTrailers'), type: 'Trailers' },
                        { name: Globalize.translate('HeaderSpecials'), type: 'Specials'  }
                    ];
                }
        }
    }

    function getDefaultSortOrder(reportType) {

        switch (reportType) {

            case 'Season':
                {
                    return "SeriesSortName,SortName";
                }
            case 'Series':
                {
                    return "SortName";
                }
            case 'Game':
                {
                    return "GameSystem,SortName";
                }
            case 'Audio':
                {
                    return "AlbumArtist,Album,SortName";
                }
            case 'Episode':
                {
                    return "SeriesSortName,SortName";
                }
            case 'BoxSet':
                {
                    return "SortName";
                }
            case 'Book':
                {
                    return "SortName";
                }
            case 'MusicArtist':
                {
                    return "SortName";
                }
            case 'MusicAlbum':
                {
                    return "AlbumArtist,SortName";
                }
            default:
                {
                    return "SortName";
                }
        }
    }

    function getItemCellsHtml(item, headercells) {

        var primaryVersion = (item.MediaSources || [])[0] || {};

        var mediaStreams = primaryVersion.MediaStreams || [];
        
        var videoStream = mediaStreams.filter(function (s) {

            return s.Type == 'Video';

        })[0];

        var audioStream = mediaStreams.filter(function (s) {

            return s.Type == 'Audio';

        })[0];

        return headercells.map(function (cell) {

            var html = '';
            html += '<td>';

            switch (cell.type || cell.name) {

                case 'Album Artist':
                    {
                        html += item.AlbumArtist || '&nbsp;';
                        break;
                    }
                case 'Album':
                    {
                        html += item.Album || '&nbsp;';
                        break;
                    }
                case 'Series':
                    {
                        html += item.SeriesName || '&nbsp;';
                        break;
                    }
                case 'Game System':
                    {
                        html += item.GameSystem || '&nbsp;';
                        break;
                    }
                case 'Network':
                    {
                        html += item.Studios.length ? item.Studios[0].Name : '&nbsp;';
                        break;
                    }
                case 'Disc':
                    {
                        html += item.ParentIndexNumber == null ? '' : item.ParentIndexNumber;
                        break;
                    }
                case 'Season Number':
                case 'Track':
                    {
                        html += item.IndexNumber == null ? '' : item.IndexNumber;
                        break;
                    }
                case 'Players':
                    {
                        html += item.Players || '&nbsp;';
                        break;
                    }
                case 'Audio':
                    {
                        if (audioStream) {

                            var name = (audioStream.Codec || '').toUpperCase();
                            html += name == 'DCA' ? (audioStream.Profile || '').toUpperCase() : name;
                        }
                        break;
                    }
                case 'Video':
                    {
                        if (videoStream) {
                            html += (videoStream.Codec || '').toUpperCase();
                        }
                        break;
                    }
                case 'Resolution':
                    {
                        if (videoStream && videoStream.Width) {
                            html += videoStream.Width + "*" + (videoStream.Height || "-");
                        }
                        break;
                    }
                case 'Embedded Image':
                    {
                        if (videoStream) {
                            html += '<div class="libraryReportIndicator clearLibraryReportIndicator"><div class="ui-icon-check ui-btn-icon-notext"></div></div>';
                        }
                        break;
                    }
                case 'Subtitles':
                    {
                        var hasSubtitles = mediaStreams.filter(function (s) {

                            return s.Type == 'Subtitle';

                        }).length;

                        if (hasSubtitles) {
                            html += '<div class="libraryReportIndicator clearLibraryReportIndicator"><div class="ui-icon-check ui-btn-icon-notext"></div></div>';
                        }
                        break;
                    }
                case 'Runtime':
                    {
                        if (item.RunTimeTicks) {
                            html += Dashboard.getDisplayTime(item.RunTimeTicks);
                        } else {
                            html += '&nbsp;';
                        }
                        break;
                    }
                case 'Trailers':
                    {
                        if (item.LocalTrailerCount) {

                            html += '<div class="libraryReportIndicator clearLibraryReportIndicator"><div class="ui-icon-check ui-btn-icon-notext"></div></div>';
                        }
                        break;
                    }
                case 'Specials':
                    {
                        if (item.SpecialFeatureCount) {

                            html += '<div class="libraryReportIndicator clearLibraryReportIndicator"><div class="ui-icon-check ui-btn-icon-notext"></div></div>';
                        }
                        break;
                    }

                case 'Season':
                    {
                        if (item.Type == "Episode") {
                            html += item.ParentIndexNumber == null ? '' : ('Season ' + item.ParentIndexNumber);
                        } else {
                            html += '<a href="edititemmetadata.html?id=' + item.Id + '">' + LibraryBrowser.getPosterViewDisplayName(item, false, false) + '</a>';
                        }
                        break;
                    }

                case 'Name':
                    {
                        html += '<a href="edititemmetadata.html?id=' + item.Id + '">' + LibraryBrowser.getPosterViewDisplayName(item, false, false) + '</a>';
                        break;
                    }
                case 'Community Rating':
                    {
                        html += item.CommunityRating || '&nbsp;';
                        break;
                    }
                case 'Parental Rating':
                    {
                        html += item.OfficialRating || '&nbsp;';
                        break;
                    }

                case 'Year':
                case 'Release Date':
                    {
                        if (item.PremiereDate && item.Type != "Series") {
                            try {
                                var date = parseISO8601Date(item.PremiereDate, { toLocal: true });

                                html += date.toLocaleDateString();
                            }
                            catch (e) {
                                html += '&nbsp;';
                            }
                        }
                        else if (item.ProductionYear) {
                            html += item.ProductionYear;

                            if (item.Status == "Continuing") {
                                html += "-Present";
                            }
                            else if (item.EndDate) {

                                try {

                                    var endYear = parseISO8601Date(item.EndDate, { toLocal: true }).getFullYear();

                                    if (endYear != item.ProductionYear) {
                                        html += "-" + parseISO8601Date(item.EndDate, { toLocal: true }).getFullYear();
                                    }

                                }
                                catch (e) {
                                    console.log("Error parsing date: " + item.EndDate);
                                }
                            }

                        } else {
                            html += '&nbsp;';
                        }
                        break;
                    }
                case 'Date Added':
                    {
                        if (item.DateCreated) {
                            try {
                                html += parseISO8601Date(item.DateCreated, { toLocal: true }).toLocaleDateString();
                            }
                            catch (e) {
                                html += '&nbsp;';
                            }
                        }
                        break;
                    }
                default:
                    {
                        if (item.LockData) {
                            html += '<img src="css/images/editor/lock.png" />';
                        }
                        if (item.IsUnidentified) {
                            html += '<div class="libraryReportIndicator"><div class="ui-icon-alert ui-btn-icon-notext"></div></div>';
                        }

                        if (!item.LocalTrailerCount && item.Type == "Movie") {
                            html += '<img src="css/images/editor/missingtrailer.png" title="Missing local trailer." />';
                        }

                        if (!item.ImageTags || !item.ImageTags.Primary) {
                            html += '<a href="edititemimages.html?id=' + item.Id + '"><img src="css/images/editor/missingprimaryimage.png" title="Missing primary image." /></a>';
                        }

                        if (!item.BackdropImageTags || !item.BackdropImageTags.length) {
                            if (item.Type !== "Episode" && item.Type !== "Season" && item.MediaType !== "Audio" && item.Type !== "TvChannel" && item.Type !== "MusicAlbum") {
                                html += '<a href="edititemimages.html?id=' + item.Id + '"><img src="css/images/editor/missingbackdrop.png" title="Missing backdrop image." /></a>';
                            }
                        }

                        if (!item.ImageTags || !item.ImageTags.Logo) {
                            if (item.Type == "Movie" || item.Type == "Trailer" || item.Type == "Series" || item.Type == "MusicArtist" || item.Type == "BoxSet") {
                                html += '<a href="edititemimages.html?id=' + item.Id + '"><img src="css/images/editor/missinglogo.png" title="Missing logo image." /></a>';
                            }
                        }

                        break;
                    }
            }

            html += '</td>';
            return html;

        }).join('');
    }

    function getReportHtml(items, reportType, currentSortField, currentSortDirection) {

        var html = '';

        html += '<table id="tblReport" data-role="table" data-mode="reflow" class="tblLibraryReport stripedTable ui-responsive table-stroke detailTable" style="display:table;">';

        html += '<thead>';
        html += '<tr>';

        var cells = getHeaderCells(reportType);

        html += cells.map(function (c) {

            var cellHtml = '<th data-priority="' + (c.priority || 'persist') + '">';

            if (c.sortField) {
                cellHtml += '<a class="lnkColumnSort" href="#" data-sortfield="' + c.sortField + '" style="text-decoration:underline;">';
            }

            cellHtml += (c.name || '&nbsp;');

            if (c.sortField) {

                cellHtml += '</a>';

                if (c.sortField == currentSortField) {

                    if (currentSortDirection == "Descending") {
                        cellHtml += '<span style="font-weight:bold;margin-left:5px;vertical-align:top;font-size:14px">&darr;</span>';
                    } else {
                        cellHtml += '<span style="font-weight:bold;margin-left:5px;vertical-align:top;font-size:14px;">&uarr;</span>';
                    }
                }
            }

            cellHtml += '</th>';

            return cellHtml;

        }).join('');

        html += '</tr>';
        html += '</thead>';

        html += '<tbody>';

        for (var i = 0, length = items.length; i < length; i++) {

            var item = items[i];

            html += '<tr>';
            html += getItemCellsHtml(item, cells);
            html += '</tr>';
        }

        html += '</tbody>';

        html += '</table>';

        return html;
    }

    function renderItems(page, result, reportType) {

        // Scroll back up so they can see the results from the beginning
        $(document).scrollTop(0);

        $('.listTopPaging', page).html(LibraryBrowser.getPagingHtml(query, result.TotalRecordCount, false, [], false)).trigger('create');

        updateFilterControls(page);

        $('.listBottomPaging', page).html(LibraryBrowser.getPagingHtml(query, result.TotalRecordCount, false, [], false)).trigger('create');

        $('.reportContainer', page).html(getReportHtml(result.Items, reportType, query.SortBy, query.SortOrder)).trigger('create');

        $('.btnNextPage', page).on('click', function () {
            query.StartIndex += query.Limit;
            reloadItems(page);
        });

        $('.btnPreviousPage', page).on('click', function () {
            query.StartIndex -= query.Limit;
            reloadItems(page);
        });

        $('.lnkColumnSort', page).on('click', function () {

            var order = this.getAttribute('data-sortfield');

            if (query.SortBy == order) {

                if (query.SortOrder == "Descending") {

                    query.SortOrder = "Ascending";
                    query.SortBy = defaultSortBy;

                } else {

                    query.SortOrder = "Descending";
                    query.SortBy = order;
                }

            } else {

                query.SortOrder = "Ascending";
                query.SortBy = order;
            }

            query.StartIndex = 0;

            reloadItems(page);
        });
    }

    function reloadItems(page) {

        var url = ApiClient.getUrl("Items", query);
        var reportType = $('#selectView', page).val();

        ApiClient.getJSON(url).done(function (result) {

            renderItems(page, result, reportType);

        });
    }

    function updateFilterControls(page) {

        $('#selectView').val(query.IncludeItemTypes).selectmenu('refresh');

        $('.chkVideoTypeFilter', page).each(function () {

            var filters = "," + (query.VideoTypes || "");
            var filterName = this.getAttribute('data-filter');

            this.checked = filters.indexOf(',' + filterName) != -1;

        }).checkboxradio('refresh');

        $('#chk3D', page).checked(query.Is3D == true).checkboxradio('refresh');
        $('#chkHD', page).checked(query.IsHD == true).checkboxradio('refresh');
        $('#chkSD', page).checked(query.IsHD == false).checkboxradio('refresh');

        $('#chkSubtitle', page).checked(query.HasSubtitles == true).checkboxradio('refresh');
        $('#chkNoSubtitle', page).checked(query.HasSubtitles === false).checkboxradio('refresh');
        $('#chkTrailer', page).checked(query.HasTrailer == true).checkboxradio('refresh');
        $('#chkNoTrailer', page).checked(query.HasTrailer == false).checkboxradio('refresh');
        $('#chkSpecialFeature', page).checked(query.HasSpecialFeature == true).checkboxradio('refresh');
        $('#chkThemeSong', page).checked(query.HasThemeSong == true).checkboxradio('refresh');
        $('#chkNoThemeSong', page).checked(query.HasThemeSong == false).checkboxradio('refresh');
        $('#chkThemeVideo', page).checked(query.HasThemeVideo == true).checkboxradio('refresh');
        $('#chkNoThemeVideo', page).checked(query.HasThemeVideo == false).checkboxradio('refresh');
        $('#chkIsPlaceHolder', page).checked(query.IsPlaceHolder == true).checkboxradio('refresh');

        $('#chkMissingRating', page).checked(query.HasOfficialRating == false).checkboxradio('refresh');
        $('#chkMissingOverview', page).checked(query.HasOverview == false).checkboxradio('refresh');
        $('#chkYearMismatch', page).checked(query.IsYearMismatched == true).checkboxradio('refresh');

        $('#chkIsUnidentified', page).checked(query.IsUnidentified == true).checkboxradio('refresh');
        $('#chkIsLocked', page).checked(query.IsLocked == true).checkboxradio('refresh');

        $('#chkSpecialEpisode', page).checked(query.ParentIndexNumber == 0).checkboxradio('refresh');
        $('#chkMissingEpisode', page).checked(query.IsMissing == true).checkboxradio('refresh');
        $('#chkFutureEpisode', page).checked(query.IsUnaired == true).checkboxradio('refresh');
    }

    $(document).on('pageinit', "#libraryReportPage", function () {

        var page = this;

        $('#radioBasicFilters', page).on('change', function () {

            if (this.checked) {
                $('.basicFilters', page).show();
                $('.advancedFilters', page).hide();
            } else {
                $('.basicFilters', page).hide();
            }
        });

        $('#radioAdvancedFilters', page).on('change', function () {

            if (this.checked) {
                $('.advancedFilters', page).show();
                $('.basicFilters', page).hide();
            } else {
                $('.advancedFilters', page).hide();
            }
        });

        $('#selectView', page).on('change', function () {

            query.StartIndex = 0;
            query.IncludeItemTypes = this.value;

            query.SortBy = getDefaultSortOrder(this.value);
            query.SortOrder = "Ascending";

            reloadItems(page);
        });

        $('.chkVideoTypeFilter', page).on('change', function () {

            var filterName = this.getAttribute('data-filter');
            var filters = query.VideoTypes || "";

            filters = (',' + filters).replace(',' + filterName, '').substring(1);

            if (this.checked) {
                filters = filters ? (filters + ',' + filterName) : filterName;
            }

            query.StartIndex = 0;
            query.VideoTypes = filters;

            reloadItems(page);
        });

        $('#chk3D', page).on('change', function () {

            query.StartIndex = 0;
            query.Is3D = this.checked ? true : null;

            reloadItems(page);
        });

        $('#chkHD', page).on('change', function () {

            query.StartIndex = 0;
            query.IsHD = this.checked ? true : null;

            reloadItems(page);
        });

        $('#chkSD', page).on('change', function () {

            query.StartIndex = 0;
            query.IsHD = this.checked ? false : null;

            reloadItems(page);
        });

        $('#chkSubtitle', page).on('change', function () {

            query.StartIndex = 0;
            query.HasSubtitles = this.checked ? true : null;

            $('#chkNoSubtitle', page).checked(false).checkboxradio('refresh');

            reloadItems(page);
        });

        $('#chkNoSubtitle', page).on('change', function () {

            query.StartIndex = 0;
            query.HasSubtitles = this.checked ? false : null;

            $('#chkSubtitle', page).checked(false).checkboxradio('refresh');

            reloadItems(page);
        });

        $('#chkTrailer', page).on('change', function () {

            query.StartIndex = 0;
            query.HasTrailer = this.checked ? true : null;

            $('#chkNoTrailer', page).checked(false).checkboxradio('refresh');

            reloadItems(page);
        });

        $('#chkNoTrailer', page).on('change', function () {

            query.StartIndex = 0;
            query.HasTrailer = this.checked ? false : null;

            $('#chkTrailer', page).checked(false).checkboxradio('refresh');

            reloadItems(page);
        });

        $('#chkSpecialFeature', page).on('change', function () {

            query.StartIndex = 0;
            query.HasSpecialFeature = this.checked ? true : null;

            reloadItems(page);
        });

        $('#chkIsPlaceHolder', page).on('change', function () {

            query.StartIndex = 0;
            query.IsPlaceHolder = this.checked ? true : null;

            reloadItems(page);
        });

        $('#chkThemeSong', page).on('change', function () {

            query.StartIndex = 0;
            query.HasThemeSong = this.checked ? true : null;

            $('#chkNoThemeSong', page).checked(false).checkboxradio('refresh');

            reloadItems(page);
        });

        $('#chkNoThemeSong', page).on('change', function () {

            query.StartIndex = 0;
            query.HasThemeSong = this.checked ? false : null;

            $('#chkThemeSong', page).checked(false).checkboxradio('refresh');

            reloadItems(page);
        });

        $('#chkThemeVideo', page).on('change', function () {

            query.StartIndex = 0;
            query.HasThemeVideo = this.checked ? true : null;
            
            $('#chkNoThemeVideo', page).checked(false).checkboxradio('refresh');

            reloadItems(page);
        });
        
        $('#chkNoThemeVideo', page).on('change', function () {

            query.StartIndex = 0;
            query.HasThemeVideo = this.checked ? false : null;
            
            $('#chkThemeVideo', page).checked(false).checkboxradio('refresh');

            reloadItems(page);
        });

        $('#chkMissingOverview', page).on('change', function () {

            query.StartIndex = 0;
            query.HasOverview = this.checked ? false : null;

            reloadItems(page);
        });

        $('#chkMissingRating', page).on('change', function () {

            query.StartIndex = 0;
            query.HasOfficialRating = this.checked ? false : null;

            reloadItems(page);
        });

        $('#chkYearMismatch', page).on('change', function () {

            query.StartIndex = 0;
            query.IsYearMismatched = this.checked ? true : null;

            reloadItems(page);
        });

        $('#chkIsUnidentified', page).on('change', function () {

            query.StartIndex = 0;
            query.IsUnidentified = this.checked ? true : null;

            reloadItems(page);
        });

        $('#chkIsLocked', page).on('change', function () {

            query.StartIndex = 0;
            query.IsLocked = this.checked ? true : null;

            reloadItems(page);
        });

        $('#chkMissingEpisode', page).on('change', function () {

            query.StartIndex = 0;
            query.IsMissing = this.checked ? true : false;

            reloadItems(page);
        });

        $('#chkFutureEpisode', page).on('change', function () {

            query.StartIndex = 0;

            if (this.checked) {
                query.IsUnaired = true;
                query.IsVirtualUnaired = null;
            } else {
                query.IsUnaired = null;
                query.IsVirtualUnaired = false;
            }


            reloadItems(page);
        });

        $('#chkSpecialEpisode', page).on('change', function () {

            query.ParentIndexNumber = this.checked ? 0 : null;

            reloadItems(page);
        });

    }).on('pagebeforeshow', "#libraryReportPage", function () {

        var page = this;

        query.SortBy = getDefaultSortOrder($('#selectView', page).val());
        query.SortOrder = "Ascending";

        $('#selectView', page).val(query.IncludeItemTypes).selectmenu('refresh').trigger('change');

    }).on('pageshow', "#libraryReportPage", function () {

        updateFilterControls(this);
    });

})(jQuery, document, window);

