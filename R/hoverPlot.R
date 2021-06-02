


myPlot <- function(x, y=NULL, ptLabels=NULL, ...) {
    if(is.null(ptLabels)){
        return(invisible(base::plot(x, y, ...)))
    }
    xyTemp <- xy.coords(x, y)
    if(length(ptLabels) != length(xyTemp$x)){
        stop('ptLabels must be same length as x (after `xycoords`)!')
    }
    colors <- makeColors(seq_along(xyTemp$x))
    infoString <- makeInfo(colors, ptLabels)
    print(colors)
    print(infoString)
    plot(x, y, col=colors, main=infoString, ...)
}


makeColors <- function(v){
    r <- (v %/% 256**2) %% 256
    g <- (v %/% 256) %% 256
    b <- v %% 256
    col <- rgb(r, g, b, maxColorValue = 255)
    return(col)
}

makeInfo <- function(colors, ptLabels){
    info <- mapply(function(col, ptLabel){
        list(
            col = col,
            label = ptLabel
        )
    }, colors, ptLabels, SIMPLIFY = FALSE, USE.NAMES = FALSE)
    print(info)
    jsonlite::toJSON(info, auto_unbox = TRUE)
}

