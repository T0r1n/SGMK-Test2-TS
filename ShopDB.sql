PGDMP                      |            ShopDB    16.0    16.0 "               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16458    ShopDB    DATABASE     |   CREATE DATABASE "ShopDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "ShopDB";
                postgres    false            �            1259    16469    characteristic    TABLE     e   CREATE TABLE public.characteristic (
    id integer NOT NULL,
    name character varying NOT NULL
);
 "   DROP TABLE public.characteristic;
       public         heap    postgres    false            �            1259    16468    characteristic_id_seq    SEQUENCE     �   CREATE SEQUENCE public.characteristic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.characteristic_id_seq;
       public          postgres    false    218                       0    0    characteristic_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.characteristic_id_seq OWNED BY public.characteristic.id;
          public          postgres    false    217            �            1259    16478    link    TABLE     �   CREATE TABLE public.link (
    id integer NOT NULL,
    "idCharId" integer,
    "idProductId" integer,
    value character varying NOT NULL
);
    DROP TABLE public.link;
       public         heap    postgres    false            �            1259    16477    link_id_seq    SEQUENCE     �   CREATE SEQUENCE public.link_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.link_id_seq;
       public          postgres    false    220                       0    0    link_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.link_id_seq OWNED BY public.link.id;
          public          postgres    false    219            �            1259    16485    log    TABLE     �   CREATE TABLE public.log (
    id integer NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL,
    "productList" character varying NOT NULL,
    "totalPrice" integer NOT NULL
);
    DROP TABLE public.log;
       public         heap    postgres    false            �            1259    16484 
   log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.log_id_seq;
       public          postgres    false    222                       0    0 
   log_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.log_id_seq OWNED BY public.log.id;
          public          postgres    false    221            �            1259    16460    product    TABLE     �   CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying NOT NULL,
    disc character varying NOT NULL,
    price integer NOT NULL,
    count integer NOT NULL
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16459    product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    216                       0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          postgres    false    215            `           2604    16472    characteristic id    DEFAULT     v   ALTER TABLE ONLY public.characteristic ALTER COLUMN id SET DEFAULT nextval('public.characteristic_id_seq'::regclass);
 @   ALTER TABLE public.characteristic ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            a           2604    16481    link id    DEFAULT     b   ALTER TABLE ONLY public.link ALTER COLUMN id SET DEFAULT nextval('public.link_id_seq'::regclass);
 6   ALTER TABLE public.link ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            b           2604    16488    log id    DEFAULT     `   ALTER TABLE ONLY public.log ALTER COLUMN id SET DEFAULT nextval('public.log_id_seq'::regclass);
 5   ALTER TABLE public.log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            _           2604    16463 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                       0    16469    characteristic 
   TABLE DATA           2   COPY public.characteristic (id, name) FROM stdin;
    public          postgres    false    218   �$                 0    16478    link 
   TABLE DATA           D   COPY public.link (id, "idCharId", "idProductId", value) FROM stdin;
    public          postgres    false    220   %                 0    16485    log 
   TABLE DATA           D   COPY public.log (id, date, "productList", "totalPrice") FROM stdin;
    public          postgres    false    222   �&       �          0    16460    product 
   TABLE DATA           ?   COPY public.product (id, name, disc, price, count) FROM stdin;
    public          postgres    false    216   -*                  0    0    characteristic_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.characteristic_id_seq', 1, false);
          public          postgres    false    217                       0    0    link_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.link_id_seq', 97, true);
          public          postgres    false    219                       0    0 
   log_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.log_id_seq', 54, true);
          public          postgres    false    221                       0    0    product_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.product_id_seq', 29, true);
          public          postgres    false    215            i           2606    16483 #   link PK_26206fb7186da72fbb9eaa3fac9 
   CONSTRAINT     c   ALTER TABLE ONLY public.link
    ADD CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.link DROP CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9";
       public            postgres    false    220            k           2606    16493 "   log PK_350604cbdf991d5930d9e618fbd 
   CONSTRAINT     b   ALTER TABLE ONLY public.log
    ADD CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.log DROP CONSTRAINT "PK_350604cbdf991d5930d9e618fbd";
       public            postgres    false    222            g           2606    16474 -   characteristic PK_88f998ec743440a5c758e08ece4 
   CONSTRAINT     m   ALTER TABLE ONLY public.characteristic
    ADD CONSTRAINT "PK_88f998ec743440a5c758e08ece4" PRIMARY KEY (id);
 Y   ALTER TABLE ONLY public.characteristic DROP CONSTRAINT "PK_88f998ec743440a5c758e08ece4";
       public            postgres    false    218            e           2606    16465 &   product PK_bebc9158e480b949565b4dc7a82 
   CONSTRAINT     f   ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.product DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82";
       public            postgres    false    216            l           2606    16504 #   link FK_4f7cfcfd2ab0af58061dd09f0ae    FK CONSTRAINT     �   ALTER TABLE ONLY public.link
    ADD CONSTRAINT "FK_4f7cfcfd2ab0af58061dd09f0ae" FOREIGN KEY ("idCharId") REFERENCES public.characteristic(id);
 O   ALTER TABLE ONLY public.link DROP CONSTRAINT "FK_4f7cfcfd2ab0af58061dd09f0ae";
       public          postgres    false    4711    218    220            m           2606    16494 #   link FK_9e9f2093ccb0f2c623aabf18848    FK CONSTRAINT     �   ALTER TABLE ONLY public.link
    ADD CONSTRAINT "FK_9e9f2093ccb0f2c623aabf18848" FOREIGN KEY ("idProductId") REFERENCES public.product(id);
 O   ALTER TABLE ONLY public.link DROP CONSTRAINT "FK_9e9f2093ccb0f2c623aabf18848";
       public          postgres    false    4709    220    216                f   x��A
�@C����j�m<LGp]p��]ځ��gx�Ff���1Q"yk|Y�xq�o�d?�H1P�i�d�"��ٽ3�H�"Wj���e�������_G�?�         �  x�]SKNC1\ۧ`�Z�8�Kp��p`��%bH�+P���w#<N[>�*Mƙ8�����$��LbX�u���P(��SZ�p���z���RW���ep��/c>��d��dHHo�s]��1_���h��;Z�:Rk�H8����b{��Nmp���"�ip�`'$J��u �0w�s�(Ú9�$-����*p�źG�B�s��L���Q/�y�J��wu�]��(��źG�h�m\:8�:y��FT1^[�<waUt��T�O��p[��e�,�����O����TH�I�$��x�vQ��<�-�Xsf�F�;��%��.���\pC�X>�3q�x2���B:7�I��y^���9��-<��Q����������w�a#�><+ ǁ��{�����cĆp�񒙿)��         ]  x��VK��6]����`��*�e��n�^:�2�pN`p|���(�=RI3v@@7��^�K�� �+��॔>����?׿��>\����ϛ�xx������_/��Zg�XM��2�� �/�^�m��}ȊdS0J��ة���He�&�@������������F�u��dV-��f����6H'�d����%� Q�v(� ���t�ば�
:�{ِ��ֱeP.1�pZE<db*]�8#Ŕ��1�N��AP=�;� �H�Qk�
p}��NH��ȫ�X*��yS5�����\$�H֎�^2��KX�#0D�Bs:s(�x�����غX�Z�7�E�A9�2����+A�`/�Y�����#LF⚙#']�mBN��p�L�dFahp�嚰 Ά�x4�}yV�'EY�dkA�]�E��Ce8#��G�̈.��s�] ���]�JRGoy4&�!�#�Z=�0��4F�GW�B;q䆍�ь[Fc"�@�w�nV��<���I�*܁?7�\l�xoK��eb��S�gsYN�^M�hQ��e%���xS��7�F5�+�x�-�:{_00R`A�ӕ���Lm����k �-pK\�ﳖ�g��d;b�?���J�]Mc���at!��k���;�EO���GAI�i]M������>:��������ӑ��p���a����~�B{x}M$�����*�Iޤ"�̓��2O�"N�����ټ�X#�Ɩ �g�7���i�-7��4�哔����m����iE:/	D���$K�6^�n�]��3_�/$�Y���҆�~��:���~��҆�}�a~��ς抏��/�d��x �5ǜrJ�_��h      �      x�}P�M�@���"��=?�^��p4@�*@DH��HqZ��9�9|��Ǭogwg�p��4+�AZ"��Bi��-2H2�0�p}�0S3e������i���.v�;����o�I��"�$�:�j��w�Gʊ�v�w���E��F^�ſ��ʞH�sji��㛝��JX2,�t%�/'�k�C��f���ԆU�!9����/Ekt]��K�%���@_�Z��y�)�J-����yU�ۦ�\�m��}���a1��2��vR-���P���\�7�����f*���?�G     