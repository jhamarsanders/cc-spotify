DROP TABLE IF EXISTS public.table;
DROP TABLE IF EXISTS public.artist;

CREATE TABLE public.track
(
    id bigserial NOT NULL,
    isrc character varying NOT NULL,
    artist_id integer NOT NULL,
    title character varying,
    image_uri character varying,
    PRIMARY KEY (id),
    CONSTRAINT isrc_uniq UNIQUE (isrc),
    ADD CONSTRAINT track_artist_fk FOREIGN KEY (artist)
        REFERENCES public.artist (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
        NOT VALID;
);

CREATE TABLE public.artist
(
    id bigserial NOT NULL,
    name character varying NOT NULL,
    PRIMARY KEY (id)
);
